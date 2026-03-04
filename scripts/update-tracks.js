const fs = require('fs');
const axios = require('axios');
const AdmZip = require('adm-zip');
const XLSX = require('xlsx');

// --- CONFIGURATION ---
const API_VERSION_URL = "https://api.heyfordy.dev/rr_app/version-rr";
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1FelOidNHL1bqSaKeycZux1eQcDyrosONFC_qWVTYoog/export?format=xlsx";
const BASE_ZIP_URL = "http://update.rwfc.net:8000/RetroRewind/zip/";
const OUTPUT_FILE = "tracks.json";

async function main() {
    try {
        console.log("🚀 Starting tracklist update...");

        // 1. Get Version
        console.log("📡 Fetching version...");
        const verRes = await axios.get(API_VERSION_URL);
        const version = verRes.data.version;
        console.log(`✅ Current version: ${version}`);

        // 2. Determine Download URL
        const downloadUrl = await determineDownloadUrl(version);
        console.log(`⬇️ Downloading Config.pul from: ${downloadUrl}`);

        // 3. Extract Config.pul
        const configBuffer = await downloadAndExtractConfig(downloadUrl);
        if (!configBuffer) throw new Error("Config.pul could not be extracted!");

        // 4. Download Excel Sheet
        console.log("⬇️ Downloading Google Sheet...");
        const sheetRes = await axios.get(GOOGLE_SHEET_URL, { responseType: 'arraybuffer' });
        const workbook = XLSX.read(sheetRes.data, { type: 'buffer' });

        // 5. Generate Database
        console.log("🔄 Generating database...");
        // IMPORTANT: Use 'latin1' to preserve binary data structure!
        const trackDb = generateTrackDb(configBuffer.toString('latin1'), workbook);

        // 6. Save
        const count = Object.keys(trackDb).length;
        if (count === 0) {
            console.warn("⚠️ Warning: 0 tracks found. Please check if the Excel header row has changed.");
        }
        
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(trackDb, null, 2));
        console.log(`🎉 Done! ${count} tracks saved to ${OUTPUT_FILE}`);

    } catch (error) {
        console.error("❌ Fatal error:", error.message);
        process.exit(1);
    }
}

async function determineDownloadUrl(version) {
    const majorMinor = version.split('.').slice(0, 2).join('.');
    const candidates = [
        `${BASE_ZIP_URL}${version}.zip`,
        `${BASE_ZIP_URL}${majorMinor}.zip`,
        `${BASE_ZIP_URL}RetroRewind.zip`
    ];

    for (const url of candidates) {
        try {
            console.log(`🔍 Checking URL: ${url}`);
            await axios.head(url, { timeout: 5000 });
            return url;
        } catch (e) {
            continue;
        }
    }
    throw new Error("No valid ZIP URL found!");
}

async function downloadAndExtractConfig(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const zip = new AdmZip(response.data);
    const zipEntries = zip.getEntries();
    const configEntry = zipEntries.find(entry => entry.entryName.endsWith('Config.pul'));
    return configEntry ? configEntry.getData() : null;
}

function generateTrackDb(configContent, workbook) {
    const db = {};
    const configMap = {};

    // --- A. Parse Config.pul ---
    const regex = /([0-9A-F]{1,3})=([^|\r\n]+)\|/g;
    let match;
    while ((match = regex.exec(configContent)) !== null) {
        const decId = parseInt(match[1], 16);
        configMap[match[2]] = decId;
    }
    console.log(`ℹ️  Config.pul parsed: ${Object.keys(configMap).length} ID mappings found.`);

    // --- B. Parse Excel Sheets ---
    const sheetsToParse = ['Retro Tracks', 'Custom Tracks', 'Battle Arenas'];

    sheetsToParse.forEach(sheetName => {
        const sheet = workbook.Sheets[sheetName];
        if (!sheet) {
            console.log(`⚠️  Sheet '${sheetName}' not found.`);
            return;
        }
        
        // FIX: range: 1 überspringt die erste Zeile ("Track list updated as of...")
        // damit die Header korrekt erkannt werden.
        const rows = XLSX.utils.sheet_to_json(sheet, { range: 1 });
        
        rows.forEach(row => {
            const fileVal = row['File'];
            let finalId = null;

            // 1. Try parsing as Integer directly
            const parsedInt = parseInt(fileVal);
            if (!isNaN(parsedInt) && String(parsedInt) == String(fileVal)) {
                finalId = parsedInt;
            } 
            // 2. Look up in Config.pul map
            else if (configMap[fileVal] !== undefined) {
                finalId = configMap[fileVal];
            }

            if (finalId !== null) {
                let type = 'Unknown';
                if (sheetName.includes('Retro')) type = 'Retro';
                else if (sheetName.includes('Custom')) type = 'Custom';
                else if (sheetName.includes('Battle')) type = 'Battle';

                db[finalId] = {
                    name: row['Track Name'],
                    author: row['Author(s)'] || '',
                    version: row['Version'] || '',
                    type: type,
                    slot: row['Track Slot'] || ''
                };
            }
        });
    });

    return db;
}

main();