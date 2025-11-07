// helper function
const el = (id) => document.getElementById(id);

// --- Constants ---
const API_BASE_URL = "https://api.heyfordy.de/rr_app/player";
const RWFC_API_URL = "https://api.heyfordy.de/rwfc";
const MII_API_URL = "https://api.heyfordy.de/rr_app/mii";
const MII_BATCH_API_URL = "https://api.heyfordy.de/rr_app/mii_batch";
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1434643639476420889/HLW7ffk1B0-4UeGzl-8UsaLvqLjpaC7qtHz1dI8-HWWwW5b5HCgsA96_vJkExkm5Yu5A"; // Report webhook
const MAX_MIIS_PER_REQUEST = 24;
const MII_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; // 7 days
const PROFILE_EXPIRE_TIME = 1000 * 60 * 60 * 24; // 1 day
const RELOAD_TIME = 1000 * 5; // 5 seconds

// --- Global State ---
let RELOAD_TIMER = null; let cur_rooms = []; let FIRST_LOAD = true;
let VRBR_FLIPPER_TIMER = null; let VRBR_STATE = 'vr';
let ROOM_DETAIL_FLIPPER_TIMER = null; let ROOM_DETAIL_STATE = 'players';
let HEADER_STATS_TIMER = null;
let HISTORY_TIMER = null; let HISTORY_MODE = false; let HISTORY_DATE = null;
let FAVORITES = []; let USER_PROFILE = null; let CURRENT_VIEW_MODE = 'mobile';
let CURRENT_NICKNAME_FC = null; // FC for the nickname modal

// --- Room Types ---
const ROOM_TYPES = { "10":{l:"🕹️ Retro Tracks",c:"#FF8C00"},"11":{l:"⏰ Online TT",c:"#FF6347"},"12":{l:"🚀 200cc",c:"#DC143C"},"13":{l:"☂️ Item Rain",c:"#1E90FF"},"14":{l:"Regular Battle",c:"#B22222"},"15":{l:"Elimination Battle",c:"#8B0000"},"20":{l:"🚧 Custom Tracks",c:"#E800A3"},"21":{l:"Vanilla Tracks",c:"#7B68EE"},"22":{l:"CT 200cc",c:"#DA70D6"},"666":{l:"Luminous 150cc",c:"#FFD700"},"667":{l:"Luminous Online TT",c:"#BDB76B"},"668":{l:"CTGP-C",c:"#32CD32"},"751":{l:"Versus",c:"#A9A9A9"},"-1":{l:"Regular",c:"#A9A9A9"},"":{l:"Private",c:"#A9A9A9"},"69":{l:"IKW Default",c:"#ADD8E6"},"70":{l:"IKW Ultras VS",c:"#008080"},"71":{l:"IKW Countdown",c:"#00FFFF"},"72":{l:"IKW Bob-omb Blast",c:"#696969"},"73":{l:"IKW Infinite Accel",c:"#4B0082"},"74":{l:"IKW Banana Slip",c:"#FFFFE0"},"75":{l:"IKW Random Items",c:"#FF00FF"},"76":{l:"IKW Unfair Items",c:"#800000"},"77":{l:"IKW Blue Shell Madness",c:"#0000CD"},"78":{l:"IKW Mushroom Dash",c:"#2E8B57"},"79":{l:"IKW Bumper Karts",c:"#A52A2A"},"80":{l:"IKW Item Rampage",c:"#FA8072"},"81":{l:"IKW Item Rain",c:"#4169E1"},"82":{l:"IKW Shell Break",c:"#2E8B57"},"83":{l:"IKW Riibalanced",c:"#C0C0C0"},"875":{l:"OptPack 150cc",c:"#7CFC00"},"876":{l:"OptPack Online TT",c:"#556B2F"},"877":{l:"OptPack",c:"#000080"},"878":{l:"OptPack",c:"#000080"},"879":{l:"OptPack",c:"#000080"},"880":{l:"OptPack",c:"#000080"},"1312":{l:"WTP 150cc",c:"#008B8B"},"1313":{l:"WTP 200cc",c:"#483D8B"},"1314":{l:"WTP Online TT",c:"#8FBC8F"},"1315":{l:"WTP Item Rain",c:"#00CED1"},"1316":{l:"WTP STYD",c:"#9400D3"} };

// --- Modals ---
const toggle_modal = (m) => el(m).classList.toggle('hidden');
const toggle_settings_modal = () => toggle_modal('settings-modal');
const toggle_favorites_modal = () => { render_favorites_list(); toggle_modal('favorites-modal'); }
const toggle_user_profile_modal = () => { update_user_profile_modal_state(); toggle_modal('user-profile-modal'); }
const hide_player_info_modal = () => el('player-info-modal').classList.add('hidden');
const toggle_info_modal = () => toggle_modal('info-modal');
const close_nickname_modal = () => { CURRENT_NICKNAME_FC = null; toggle_modal('nickname-modal'); }

// --- Report modal functions ---
const close_report_modal = () => {
    toggle_modal('report-modal');
    el('report-form').reset();
    el('rr-report-player-display').innerHTML = '';
    el('rr-report-status').style.display = 'none';
    el('rr-other-description-group').style.display = 'none';
    el('rr-additional-details-group').style.display = 'none';
    el('rr-report-otherDescription').required = false;
}
const show_report_modal = (fc, miiName) => {
    // Player display
    const miiSrc = get_cached_mii_image(fc) ? (get_cached_mii_image(fc).startsWith('data:image') ? get_cached_mii_image(fc) : `data:image/png;base64,${get_cached_mii_image(fc)}`) : 'empty.png';
    const miiKey = get_cached_mii_image(fc) ? null : fc;
    
    const miiDisplay = el('rr-report-player-display');
    miiDisplay.innerHTML = `
        <img class="player-mii-large" src="${miiSrc}" alt="Mii" ${miiKey ? `mii-data="${miiKey}"` : ''}>
        <div>
            <div class="player-name">${handle_mii_name(miiName)}</div>
            <div class="player-fc">${fc.replace(/[^0-9]/g, '').replace(/(\d{4})(?=\d)/g, '$1-')}</div>
        </div>
    `;
    if (miiKey) fetch_mii_images([miiKey]); // Fetch only if not in cache
    
    // Hidden inputs
    el('rr-report-fc-hidden').value = fc;
    el('rr-report-miiName-hidden').value = miiName;
    
    toggle_modal('report-modal');
}

// --- Generic Cache ---
function get_cached_item(key, expireTime) {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
        const [data, timestamp] = JSON.parse(item);
        if (Date.now() - timestamp > expireTime) {
            localStorage.removeItem(key);
            return null;
        }
        return { data, timestamp };
    } catch (e) {
        localStorage.removeItem(key);
        return null;
    }
}
function set_cached_item(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify([data, Date.now()]));
    } catch(e) {
        console.error("Cache set failed", e);
        // simple clear strategy for quota limit
        if (e.name === 'QuotaExceededError') {
            clear_expired_cache();
            try { // try again
                localStorage.setItem(key, JSON.stringify([data, Date.now()]));
            } catch (e2) {
                console.error("Cache set failed again after clear", e2);
            }
        }
    }
}
function clear_expired_cache() {
    console.log("Clearing expired cache...");
    let r = [];
    for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.startsWith("mii_img_")) {
            get_cached_mii_image(k.replace("mii_img_", "")); // this auto-removes if expired
        } else if (k === 'userProfileData') {
            get_cached_item(k, PROFILE_EXPIRE_TIME); // this auto-removes if expired
        }
    }
}


// --- Global Click Listener (Modals/Menus) ---
document.addEventListener('click', (e) => {
    // Global click listener
    document.querySelectorAll('.modal').forEach(m => { if (e.target === m) m.classList.add('hidden'); });

    let menu_was_closed = false;
    document.querySelectorAll('.player-menu').forEach(m => {
        if (m.style.display === 'block' && !m.contains(e.target) && !e.target.classList.contains('player-menu-btn')) {
            m.style.display = 'none';
            menu_was_closed = true;
        }
    });

    if (menu_was_closed) {
        // A menu was closed, resume timer
        if (RELOAD_TIMER) clearInterval(RELOAD_TIMER);
        if (el("timeout-checkbox").checked && !HISTORY_MODE) {
            const f = fetch_rooms;
            RELOAD_TIMER = setInterval(f, RELOAD_TIME);
        }
    }
});

// --- Player Menu ---
function toggle_player_menu(m) {
    // Player menu toggle
    document.querySelectorAll('.player-menu').forEach(i => { if (i !== m) i.style.display = 'none'; });
    const is_showing = m.style.display === 'block';
    m.style.display = is_showing ? 'none' : 'block';

    if (RELOAD_TIMER) clearInterval(RELOAD_TIMER); // Always clear timer

    if (is_showing) {
        // Menu is now closed, restart timer
        if (el("timeout-checkbox").checked && !HISTORY_MODE) {
            const f = fetch_rooms;
            RELOAD_TIMER = setInterval(f, RELOAD_TIME);
        }
    }
    // If menu is now open, timer remains cleared
}

// --- Relative Time Formatter ---
function format_last_seen(dateString) {
    if (!dateString) return 'N/A';
    const lastSeenDate = new Date(dateString);
    const now = new Date();
    const diffSeconds = Math.floor((now - lastSeenDate) / 1000);

    if (diffSeconds < 120) { // Less than 2 minutes
        return '<strong style="color: #4CAF50;">Now online</strong>';
    }
    if (diffSeconds < 3600) { // Less than 1 hour
        return `${Math.floor(diffSeconds / 60)} min. ago`;
    }
    if (diffSeconds < 86400) { // Less than 24 hours
        return `${Math.floor(diffSeconds / 3600)}h ago`;
    }
    return lastSeenDate.toLocaleString(); // Default
}

// --- Player Info Modal ---
async function show_player_info_modal(fc) {
    const mc = el('player-info-content'); mc.innerHTML = 'Loading player info...';
    el('player-info-modal').classList.remove('hidden');
    try {
        const r = await fetch(`${API_BASE_URL}?info=${fc}`); if (!r.ok) throw new Error(`API error: ${r.status}`);
        const d = await r.json();
        
        let mk = null;
        const cachedMii = get_cached_mii_image(d.FC);
        let ms = 'empty.png';
        if (cachedMii) {
            ms = cachedMii.startsWith('data:image') ? cachedMii : `data:image/png;base64,${cachedMii}`;
        } else if (d.miiImageBase64) {
            ms = `data:image/png;base64,${d.miiImageBase64}`;
            set_cached_mii_image(d.FC, ms); // Cache it
        } else {
            mk = d.FC; // Queue for fetch
        }

        mc.innerHTML = _get_player_profile_html(d, ms, mk, false); // false = not user profile
        
        if (mk) fetch_mii_images([mk]); // Fetch if missing
    } catch (e) { console.error("Error fetching player info:", e); mc.innerHTML = `<p style="color:red;">Error loading player info for ${fc}.</p>`; }
}

// --- Copy FC ---
 function copy_fc(fc) { if (navigator.clipboard) { navigator.clipboard.writeText(fc).catch(e => { console.error('Copy fail: ', e); prompt("Manual copy:", fc); }); } else { prompt("Manual copy:", fc); } document.querySelectorAll('.player-menu').forEach(m => m.style.display = 'none'); }

// --- Favorites Nickname Helper ---
function get_display_name(fc, defaultName) {
    const fav = FAVORITES.find(f => f.fc === fc);
    return (fav && fav.nickname) ? fav.nickname : defaultName;
}

// --- Nickname Modal ---
function show_nickname_modal(fc, encodedName, e) {
    if (e) e.stopPropagation();
    CURRENT_NICKNAME_FC = fc;
    const fav = FAVORITES.find(f => f.fc === fc);
    const defaultName = decodeURIComponent(encodedName);
    el('nickname-input').value = fav?.nickname || '';
    el('nickname-input').placeholder = `Enter nickname for ${defaultName}`;
    el('nickname-modal').classList.remove('hidden');
    document.querySelectorAll('.player-menu').forEach(m => m.style.display = 'none');
}
function apply_nickname() {
    if (!CURRENT_NICKNAME_FC) return;
    const fav = FAVORITES.find(f => f.fc === CURRENT_NICKNAME_FC);
    if (fav) {
        const newNick = el('nickname-input').value.trim();
        fav.nickname = newNick ? newNick : null;
        save_favorites();
        render_favorites_list(); // refresh modal list
        reload_rooms(); // refresh main room list
    }
    close_nickname_modal();
}
function reset_nickname() {
    if (!CURRENT_NICKNAME_FC) return;
    const fav = FAVORITES.find(f => f.fc === CURRENT_NICKNAME_FC);
    if (fav) {
        fav.nickname = null;
        save_favorites();
        render_favorites_list();
        reload_rooms();
    }
    close_nickname_modal();
}


// --- Favorites Management ---
function load_favorites() {
    const f = localStorage.getItem("favorites");
    let favs = f ? JSON.parse(f) : [];
    // migrate old format
    if (favs.length > 0 && typeof favs[0].nickname === 'undefined') {
        FAVORITES = favs.map(oldF => ({ fc: oldF.fc, name: oldF.name, nickname: null }));
        save_favorites();
    } else {
        FAVORITES = favs;
    }
}
function save_favorites() { localStorage.setItem("favorites", JSON.stringify(FAVORITES)); }
function is_favorite(fc) { return FAVORITES.some(f => f.fc === fc); }
 
async function add_favorite(fc, e) {
    // Add player to favorites
    if (e) e.stopPropagation();
    if (is_favorite(fc)) return; // Do not add duplicates

    try {
        const r = await fetch(`${API_BASE_URL}?info=${fc}`);
        if (!r.ok) throw new Error('Player not found');
        const d = await r.json();
        FAVORITES.push({ fc: d.FC, name: d.name, nickname: null });
        save_favorites();
    } catch (err) {
        console.error("Favorite add fail:", err);
    }
    
    document.querySelectorAll('.player-menu').forEach(m => m.style.display = 'none');
    reload_rooms(); // Refresh UI
}
 
function remove_favorite(fc, fm = false, e) {
    // Remove player from favorites
    if (e) e.stopPropagation();

    const l = FAVORITES.length;
    FAVORITES = FAVORITES.filter(f => f.fc !== fc);

    if (FAVORITES.length < l) {
        save_favorites();
        if (fm) {
            render_favorites_list();
        } else {
             document.querySelectorAll('.player-menu').forEach(m => m.style.display = 'none');
             reload_rooms(); // Refresh UI
        }
    }
}
 
async function render_favorites_list() {
    // Render favorites list in modal
    const lc = el('favorites-list'); if (FAVORITES.length === 0) { lc.innerHTML = '<p>No favorites added yet.</p>'; return; } lc.innerHTML = 'Loading favorites...';
    let mii_keys = []; let h = '';
    FAVORITES.forEach((f, i) => {
        let mk = null;
        const cachedMii = get_cached_mii_image(f.fc);
        let ms = 'empty.png';
        if (cachedMii) {
            ms = cachedMii.startsWith('data:image') ? cachedMii : `data:image/png;base64,${cachedMii}`;
        } else {
            mk = f.fc;
            mii_keys.push(mk);
        }
        const displayName = get_display_name(f.fc, f.name);
        const nickText = (f.nickname) ? "Edit Nickname" : "Set Nickname";
        h += `<div class="player-row favorite-row">
                  <img class="player-mii" src="${ms}" alt="Mii" ${mk ? `mii-data="${mk}"` : ''}>
                  <div class="player-info" onclick="show_player_info_modal('${f.fc}')">
                      <div class="player-name">${handle_mii_name(displayName)}</div>
                      <div class="player-fc">${f.fc}</div>
                  </div>
                  <button class="edit-nickname-btn" onclick="show_nickname_modal('${f.fc}', '${encodeURIComponent(f.name)}', event)" title="${nickText}">
                      ✏️
                  </button>
                  <button class="remove-favorite-btn" onclick="remove_favorite('${f.fc}', true, event)" title="Remove">X</button>
              </div>`;
    });
    lc.innerHTML = h;
    if (mii_keys.length > 0) fetch_mii_images(mii_keys);
 }

// --- User Profile Management ---
function load_user_profile() { const p = get_cached_item("userProfile", PROFILE_EXPIRE_TIME * 30); USER_PROFILE = p ? p.data : null; }
function save_user_profile() { if (USER_PROFILE) set_cached_item("userProfile", USER_PROFILE); else localStorage.removeItem("userProfile"); }
 
async function search_user() {
    // Search for user profile
    const q = el('user-search-input').value.trim(), rc = el('user-search-results'); if (!q) { rc.innerHTML = '<p>Enter name or FC.</p>'; return; } 
    rc.innerHTML = '';
    let a = 0, mA = 2, s = false;
    while (a < mA && !s) {
        try {
            const r = await fetch(`${API_BASE_URL}?find=${encodeURIComponent(q)}`); if (!r.ok) throw new Error(`API error: ${r.status}`); const p = await r.json(); s = true;
            if (!p || p.length === 0) { rc.innerHTML = '<p>No players found.</p>'; return; }
            
            let mii_keys = []; let h = '';
            p.forEach((pl, i) => {
                let mk = null;
                const cachedMii = get_cached_mii_image(pl.FC);
                let ms = 'empty.png';
                if (cachedMii) {
                    ms = cachedMii.startsWith('data:image') ? cachedMii : `data:image/png;base64,${cachedMii}`;
                } else {
                    mk = pl.FC;
                    mii_keys.push(mk);
                }
                h += `<div class="player-row search-result-row" onclick="set_user_profile('${pl.FC}', '${encodeURIComponent(pl.name)}')">
                          <img class="player-mii" src="${ms}" alt="Mii" ${mk ? `mii-data="${mk}"` : ''}>
                          <div class="player-info"> <div class="player-name">${handle_mii_name(pl.name)}</div> <div class="player-fc">${pl.FC}</div> </div>
                          <button class="select-profile-btn">Select</button>
                      </div>`;
            });
            rc.innerHTML = h;
            if (mii_keys.length > 0) fetch_mii_images_batch(mii_keys); // Use new batch endpoint for search

        } catch (e) { a++; console.error(`Search attempt ${a} failed:`, e); if (a >= mA) rc.innerHTML = `<p style="color:red;">Search failed.</p>`; else await new Promise(res => setTimeout(res, 500)); }
    }
 }
function set_user_profile(fc, en) { const n = decodeURIComponent(en); USER_PROFILE = { fc, n }; save_user_profile(); update_user_profile_modal_state(); reload_rooms(); }
function logout_user() { USER_PROFILE = null; save_user_profile(); location.reload(); }

function _get_player_profile_html(d, miiSrc, miiKey, isUserProfile = false) {
    // helper to generate profile HTML
    const vr24 = d.vrStats?.last24Hours ?? 0; const vr7 = d.vrStats?.lastWeek ?? 0; const vr30 = d.vrStats?.lastMonth ?? 0;
    const formatVRStat = (v) => v === 0 ? '0' : (v > 0 ? `+${v}` : `${v}`);
    const vrClass = (v) => v === 0 ? '' : (v > 0 ? 'vr-positive' : 'vr-negative');
    
    return `
         <div class="player-info-modal-header">
             <img class="player-mii-large" src="${miiSrc}" alt="Mii" ${miiKey ? `mii-data="${miiKey}"` : ''}>
             <div>
                 <div class="player-name">${handle_mii_name(get_display_name(d.FC, d.name))}</div>
                 <div class="player-fc">${d.FC}</div>
             </div>
         </div>
         <div class="player-info-modal-lastseen"> Last Seen: ${format_last_seen(d.lastSeen)} </div>
         <div class="player-info-modal-stats-grid">
             <div class="stat-item"> <span class="stat-label">Rank</span> <span class="stat-value">${d.rank ? `#${d.rank}` : 'N/A'}</span> </div>
             <div class="stat-item"> <span class="stat-label">VR</span> <span class="stat-value">${d.vr || 'N/A'}</span> </div>
         </div>
         <h3 class="vr-stats-heading">VR Stats</h3>
         <div class="player-info-modal-stats-grid">
             <div class="stat-item"> <span class="stat-label">24h</span> <span class="stat-value ${vrClass(vr24)}">${formatVRStat(vr24)}</span> </div>
             <div class="stat-item"> <span class="stat-label">7d</span> <span class="stat-value ${vrClass(vr7)}">${formatVRStat(vr7)}</span> </div>
             <div class="stat-item"> <span class="stat-label">30d</span> <span class="stat-value ${vrClass(vr30)}">${formatVRStat(vr30)}</span> </div>
         </div>
         <div class="player-info-modal-buttons">
            <button class="modal-close-btn" style="background: #555;" onclick="window.open('https://rwfc.net/player/${d.FC}', '_blank')">🌍 Visit rwfc.net</button>
            ${!isUserProfile ? `<button class="modal-close-btn report-btn" onclick="hide_player_info_modal(); show_report_modal('${d.FC}', '${d.name}')">🚩 Report Player</button>` : ''}
         </div>
         <div class="player-info-modal-active-rank"> Active Rank: ${d.activeRank ? `#${d.activeRank}` : 'N/A'} </div>
         <div id="user-profile-cache-status" class="player-info-modal-cache-status"></div>`;
}

async function render_user_profile() {
    // Render user profile in modal, using cache first
    const dc = el('user-profile-display');
    let mii_keys_to_fetch = [];
    
    // 1. Get cached data
    const cached = get_cached_item(`profile_${USER_PROFILE.fc}`, PROFILE_EXPIRE_TIME);
    if (cached) {
        const cachedMii = get_cached_mii_image(cached.data.FC);
        let ms = cachedMii ? (cachedMii.startsWith('data:image') ? cachedMii : `data:image/png;base64,${cachedMii}`) : 'empty.png';
        let mk = cachedMii ? null : cached.data.FC;
        dc.innerHTML = _get_player_profile_html(cached.data, ms, mk, true); // true = is user profile
        const cst = el('user-profile-cache-status');
        if(cst) cst.textContent = `Cached: ${new Date(cached.timestamp).toLocaleString()}. Refreshing...`;
        if(mk) mii_keys_to_fetch.push(mk);
    } else {
        dc.innerHTML = 'Loading...';
    }

    // 2. Fetch fresh data
    try {
        const r = await fetch(`${API_BASE_URL}?info=${USER_PROFILE.fc}`);
        if (!r.ok) throw new Error(`API error: ${r.status}`);
        const d = await r.json();
        set_cached_item(`profile_${USER_PROFILE.fc}`, d); // Save fresh data

        let mk = null;
        const cachedMii = get_cached_mii_image(d.FC);
        let ms = 'empty.png';
        if (cachedMii) {
            ms = cachedMii.startsWith('data:image') ? cachedMii : `data:image/png;base64,${cachedMii}`;
        } else if (d.miiImageBase64) {
            ms = `data:image/png;base64,${d.miiImageBase64}`;
            set_cached_mii_image(d.FC, ms); // Cache mii
        } else {
            mk = d.FC;
            mii_keys_to_fetch.push(mk);
        }

        dc.innerHTML = _get_player_profile_html(d, ms, mk, true); // Render fresh data
        const cst = el('user-profile-cache-status');
        if(cst) cst.textContent = `Updated: ${new Date().toLocaleString()}`;
    } catch (e) {
        console.error("Error fetching user profile:", e);
        const cst = el('user-profile-cache-status');
        if(cst) {
            cst.textContent = `Update failed. ${cst.textContent.replace('Refreshing...', '')}`;
        }
        if (!cached) dc.innerHTML = `<p style="color:red;">Error loading profile.</p>`;
    }
    
    if (mii_keys_to_fetch.length > 0) fetch_mii_images(mii_keys_to_fetch);
 }
 
 function update_user_profile_modal_state() {
     // Toggle profile modal views
     const lv = el('user-login-view'), pv = el('user-profile-view'), sc = lv.querySelector('.user-search-container'), sr = el('user-search-results'), lb = el('logout-btn');
     if (USER_PROFILE) {
         lv.classList.add('hidden'); sc.style.display = 'none'; sr.style.display = 'none'; pv.classList.remove('hidden'); lb.style.display = 'block';
         render_user_profile();
     } else {
         pv.classList.add('hidden'); lv.classList.remove('hidden'); sc.style.display = 'flex'; sr.style.display = 'block'; lb.style.display = 'none';
         el('user-search-input').value = ''; sr.innerHTML = '';
     }
 }

// --- History ---
function on_history_change() { if (HISTORY_TIMER) clearTimeout(HISTORY_TIMER); HISTORY_TIMER = setTimeout(change_history, 1000); }
function add_history(m) { let i=el("history-input"),t=new Date(i.value).getTime();t+=m*60*1000;let o=new Date().getTimezoneOffset()*60000;t-=o;i.value=new Date(t).toISOString().slice(0,16);on_history_change();}
function change_history() { console.log("History enabled."); HISTORY_MODE = true; on_checkbox(); fetch_rooms(); }
function disable_history() { HISTORY_MODE = false; let p=new URL(location.href).searchParams; p.delete("time"); history.replaceState(null, null, location.pathname + `?${p.toString()}`); on_checkbox(); fetch_rooms(); }

// --- Room Filter ---
function disable_filter() { let p=new URL(location.href).searchParams; p.delete("room"); history.replaceState(null, null, location.pathname + `?${p.toString()}`); reload_rooms(); }

// --- Mii Name Handling ---
function _escape(s){ return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/(?:\r\n|\r|\n)/g,''); }
function handle_mii_name(n){ if (!n) return "Guest"; if (n.length > 10) n=n.substring(0, 10); return filter_mii_name(_escape(n)); }
function char_code_is_wide(c){ return (c >= 0xF103 && c <= 0xF12F) || c == 0x2026; }
function filter_mii_name(n){ let nw="", sp=false; for(let i=0; i<n.length; i++){ const c=n.charCodeAt(i); if(char_code_is_wide(c)){ if(!sp){ nw+="<span class=\"wide-char\">"; sp=true; } } else { if(sp){ nw+="</span>"; sp=false; } } nw+=n[i]; } if(sp) nw+="</span>"; return nw; }

// --- Room Splitting/Prioritization ---
function fix_split_rooms(rooms){
  let nr = []; for (let r of rooms){ const pk = Object.keys(r.players); r.split = false; if (pk.length <= 1) { nr.push(r); continue; } let pd = Array.from({length: pk.length}, () => []); for (let i = 0; i < pk.length; i++){ const p = r.players[pk[i]]; const cm = p.conn_map || ""; for (let j = 0; j < cm.length; j++){ if (cm[j] != "0"){ let ti = j; if (ti >= i) ti++; if (ti < pk.length) pd[i].push(ti); } } } let sp = []; let csr = []; for (let i = 0; i < pd.length; i++){ if (sp.includes(i)) continue; let n_r = JSON.parse(JSON.stringify(r)); n_r.players = {}; let npi = []; function ra(idx){ if (sp.includes(idx)) return; sp.push(idx); let cc = pd[idx] || []; for (const ci of cc){ if (ci < pd.length && pd[ci]?.includes(idx)) ra(ci); } npi.push(idx); } ra(i); npi.sort((a, b) => a - b); for (const idx of npi) n_r.players[pk[idx]] = r.players[pk[idx]]; csr.push(n_r); } if (csr.length > 1){ csr.forEach((sr) => { sr.split = !(Object.keys(r.players)[0] in sr.players); }); let pF = []; if (USER_PROFILE) pF.push(USER_PROFILE.fc); FAVORITES.forEach(f => { if (!pF.includes(f.fc)) pF.push(f.fc); }); let tmp = []; for (let s of csr){ let f = false; for (const pi of Object.keys(s.players)){ if (pF.includes(s.players[pi].fc)){ tmp.unshift(s); f = true; break; } } if (!f) tmp.push(s); } csr = tmp; nr = nr.concat(csr); } else { nr.push(r); } } return nr;
}

function prioritize_rooms(rooms) {
    // Sorts rooms: 1. User, 2. Favorites, 3. Others
    let user_fc = USER_PROFILE ? USER_PROFILE.fc : null;
    let fav_fcs = FAVORITES.map(f => f.fc).filter(f => f !== user_fc);
    
    let user_rooms = [], fav_rooms = [], public_rooms = [], private_rooms = [];

    for (let room of rooms) {
        let is_user_room = false;
        let is_fav_room = false;
        
        for (let p_idx of Object.keys(room.players)) {
            const fc = room.players[p_idx].fc;
            if (user_fc && fc === user_fc) {
                is_user_room = true;
                break; // User room is max priority
            }
            if (fav_fcs.includes(fc)) {
                is_fav_room = true;
            }
        }

        if (is_user_room) {
            user_rooms.push(room);
        } else if (is_fav_room) {
            fav_rooms.push(room);
        } else if (room.type === "anybody") {
            public_rooms.push(room);
        } else {
            private_rooms.push(room);
        }
    }
    
    // Apply secondary sort (player count or time) to each category
    const so = localStorage.getItem("sort-order") || "player_count";
    const gc = (r) => Object.values(r.players).reduce((c, p) => c + (p.mii ? p.mii.length : 1), 0);
    const sortFn = (a, b) => (so === "time_created") ? (new Date(a.created) - new Date(b.created)) : (gc(b) - gc(a));
    
    user_rooms.sort(sortFn);
    fav_rooms.sort(sortFn);
    public_rooms.sort(sortFn);
    private_rooms.sort(sortFn);

    // Combine lists
    return user_rooms.concat(fav_rooms).concat(public_rooms).concat(private_rooms);
}

// --- Uptime Update ---
let prev_uptime_update_date = null; let uptimes_timer = null;
function update_uptimes(sr=false){ const ss=document.querySelectorAll("span[created]"); if(!HISTORY_MODE||sr||FIRST_LOAD){ FIRST_LOAD=false; for(const s of ss){ const c=new Date(s.getAttribute("created")); let n=HISTORY_MODE?HISTORY_DATE:new Date(); const d=n-c; let sc=Math.floor(d/1000),m=Math.floor(sc/60),h=Math.floor(m/60),dy=Math.floor(h/24); h%=24; m%=60; sc%=60; let ps=sc.toString().padStart(2,"0"),pm=m.toString().padStart(2,"0"),ph=h.toString().padStart(2,"0"); let str=`${h}:${pm}:${ps}`; if(dy>0) str=`${dy}:${ph}:${pm}:${ps}`; s.textContent=str; }} if(sr) return; let ms=1000; if(prev_uptime_update_date) ms-=(Date.now()-prev_uptime_update_date); prev_uptime_update_date=Date.now(); if(uptimes_timer) clearTimeout(uptimes_timer); uptimes_timer=setTimeout(update_uptimes, Math.max(0,ms)); }

// --- Header Stats ---
function update_header_stats(rc, pc, isFiltered) { const s=el("header-stats-checkbox").checked, c=el("header-stats"), cs=el("header-stats-content"); if(!s||isFiltered){ c.classList.add('hidden'); if(HEADER_STATS_TIMER) clearTimeout(HEADER_STATS_TIMER); HEADER_STATS_TIMER=null; return; } c.classList.remove('hidden'); cs.innerHTML=`<span class="excited">${rc}</span> ${rc===1?'Room':'Rooms'} • <span class="excited">${pc}</span> ${pc===1?'Player':'Players'}`; }

// --- VR/BR Flipper ---
function start_vrbr_flipper() { if(VRBR_FLIPPER_TIMER) clearInterval(VRBR_FLIPPER_TIMER); if(el("vr-only-checkbox").checked){ document.querySelectorAll('.player-vrbr[data-vr][data-br]').forEach(e=>{e.textContent=`${e.dataset.vr} VR`; e.style.opacity=1;}); return; } const u=()=>{ const es=document.querySelectorAll('.player-vrbr[data-vr][data-br]'); if(el("vr-only-checkbox").checked){ if(VRBR_FLIPPER_TIMER) clearInterval(VRBR_FLIPPER_TIMER); es.forEach(e=>{e.textContent=`${e.dataset.vr} VR`; e.style.opacity=1;}); return; } VRBR_STATE=VRBR_STATE==='vr'?'br':'vr'; for(const e of es) e.style.opacity=0; setTimeout(()=>{ for(const e of es) { e.textContent=(VRBR_STATE==='vr')?`${e.dataset.vr} VR`:`${e.dataset.br} BR`; e.style.opacity=1; }}, 300); }; u(); VRBR_FLIPPER_TIMER=setInterval(u, 3000); }

// --- Room Detail Flipper ---
function start_room_detail_flipper() {
    if (ROOM_DETAIL_FLIPPER_TIMER) clearInterval(ROOM_DETAIL_FLIPPER_TIMER);
    const show_avg_vr = el("avg-vr-checkbox").checked;
    
    // Reset all to players view first
    document.querySelectorAll('.room-detail-flipper').forEach(e => {
        if(e.dataset.players) e.innerHTML = e.dataset.players;
        e.style.opacity = 1;
    });

    if (!show_avg_vr) return; // Do not start flipper if disabled

    const u = () => {
        if (!el("avg-vr-checkbox").checked) { // Check again in case it was disabled
             if (ROOM_DETAIL_FLIPPER_TIMER) clearInterval(ROOM_DETAIL_FLIPPER_TIMER);
             document.querySelectorAll('.room-detail-flipper').forEach(e => {
                 if(e.dataset.players) e.innerHTML = e.dataset.players;
                 e.style.opacity = 1;
             });
             return;
        }
        
        ROOM_DETAIL_STATE = ROOM_DETAIL_STATE === 'players' ? 'vr' : 'players';
        const es = document.querySelectorAll('.room-detail-flipper[data-players][data-vr]');

        for (const e of es) e.style.opacity = 0;
        setTimeout(() => {
            for (const e of es) {
                e.innerHTML = (ROOM_DETAIL_STATE === 'players') ? e.dataset.players : e.dataset.vr;
                e.style.opacity = 1;
            }
        }, 300);
    };
    u(); // Initial call
    ROOM_DETAIL_FLIPPER_TIMER = setInterval(u, 3000); // Flip every 3 seconds
}

// --- Settings Handlers ---
function on_vr_only_change() { const c=el("vr-only-checkbox").checked; localStorage.setItem("vr-only", c); if(c){ if(VRBR_FLIPPER_TIMER) clearInterval(VRBR_FLIPPER_TIMER); document.querySelectorAll('.player-vrbr[data-vr][data-br]').forEach(e=>{e.textContent=`${e.dataset.vr} VR`; e.style.opacity=1;}); } else { start_vrbr_flipper(); } }
function on_theme_change() { const t=el("theme-select").value; localStorage.setItem("theme", t); apply_theme(t); }
function apply_theme(t) { document.body.className=''; if(t==="blue") document.body.classList.add("theme-blue"); else if(t==="orange") document.body.classList.add("theme-orange"); else document.body.classList.add("theme-dark"); document.body.classList.add(CURRENT_VIEW_MODE==='desktop'?'desktop-view':'mobile-view'); }
function on_header_stats_change() { const c=el("header-stats-checkbox").checked; localStorage.setItem("show-header-stats", c); reload_rooms(); }
function on_sort_order_change() { const s=el("sort-order-select").value; localStorage.setItem("sort-order", s); reload_rooms(); }
function on_checkbox(){ 
    const s=el("timeout-checkbox").checked; 
    localStorage.setItem("auto-reload", s); 
    if(RELOAD_TIMER) clearInterval(RELOAD_TIMER); 
    if(s && !HISTORY_MODE){ 
        const f = fetch_rooms;
        RELOAD_TIMER=setInterval(f, RELOAD_TIME); 
    } 
}
function on_private_checkbox() { const c=el("private-checkbox").checked; localStorage.setItem("show-private", c); reload_rooms(); }
function on_openhost_checkbox() { const c=el("openhost-checkbox").checked; localStorage.setItem("openhost", c); update_openhost_underline(); }
function on_avg_vr_change() { const c=el("avg-vr-checkbox").checked; localStorage.setItem("show-avg-vr", c); start_room_detail_flipper(); }
function update_openhost_underline() { const s=el("openhost-checkbox").checked; document.querySelectorAll(".player-fc[openhost]").forEach(t=>{t.classList.toggle("openhost", s);}); }

// --- View Mode ---
 function set_view_mode(m) { CURRENT_VIEW_MODE=(m==='desktop')?'desktop':'mobile'; localStorage.setItem("view-mode", CURRENT_VIEW_MODE); apply_view_mode_styling(); }
 function apply_view_mode_styling() { const d=(CURRENT_VIEW_MODE==='desktop'); document.body.classList.toggle('desktop-view', d); document.body.classList.toggle('mobile-view', !d); el('view-mode-desktop-btn').classList.toggle('active', d); el('view-mode-mobile-btn').classList.toggle('active', !d); }
 function detect_initial_view_mode() { const s=localStorage.getItem("view-mode"); if(s) CURRENT_VIEW_MODE=s; else CURRENT_VIEW_MODE=window.innerWidth>768?'desktop':'mobile'; apply_view_mode_styling(); }

// --- Mii Image Caching/Fetching ---
function remove_expired_mii_images(){
    // Remove expired mii images from local storage
    let r=[]; for(let i=0; i<localStorage.length; i++){ const k=localStorage.key(i); if(k.startsWith("mii_img_")){ try { const d=JSON.parse(localStorage.getItem(k)); if(!Array.isArray(d)||d.length!==2||typeof d[1]!=='number'||(Date.now()-d[1]>MII_EXPIRE_TIME)) r.push(k); } catch(e){ r.push(k); } } } for(const k of r) localStorage.removeItem(k);
}
function get_cached_mii_image(k){
    // Get cached mii image from local storage
    const c=`mii_img_${k}`; const s=localStorage.getItem(c); if(!s) return null; try { const a=JSON.parse(s); if(!Array.isArray(a)||a.length!==2||typeof a[1]!=='number'||(Date.now()-a[1]>MII_EXPIRE_TIME)){ localStorage.removeItem(c); return null; } return a[0]; } catch(e){ localStorage.removeItem(c); return null; }
}
function set_cached_mii_image(k, img){
    // Set cached mii image in local storage with quota handling
    const c = `mii_img_${k}`;
    const d = [img, Date.now()];
    try {
        localStorage.setItem(c, JSON.stringify(d));
    } catch(e) {
        console.error("Mii cache fail. Attempting to clear old cache.", e);
        remove_expired_mii_images(); // Clear expired
        try {
            localStorage.setItem(c, JSON.stringify(d)); // Try again
        } catch (e2) {
            // Still failing? Clear all mii cache
            console.error("Mii cache still full. Clearing all mii cache.", e2);
            let r = [];
            for (let i = 0; i < localStorage.length; i++) {
                if (localStorage.key(i).startsWith("mii_img_")) {
                    r.push(localStorage.key(i));
                }
            }
            for (const k of r) localStorage.removeItem(k);
            try {
                localStorage.setItem(c, JSON.stringify(d)); // Last attempt
            } catch (e3) {
                console.error("Mii cache final attempt failed.", e3);
            }
        }
    }
}
function apply_mii_image(k, img){
    // Apply mii image to relevant elements
    set_cached_mii_image(k, img); const els=document.querySelectorAll(`img[mii-data="${CSS.escape(k)}"]`); if(!els||els.length===0) return; const src = img.startsWith('data:image') ? img : `data:image/png;base64,${img}`; for(const el of els) { if (el.src !== src) el.src=src; }
}
async function fetch_mii_images(keys){
    // Fetch mii images in batches (Umapyoi)
    let u=[...new Set(keys)].filter(Boolean), f=[]; for(const k of u){ let c=get_cached_mii_image(k); if(c) apply_mii_image(k, c); else f.push(k); } for(let i=0; i<f.length; i+=MAX_MIIS_PER_REQUEST){ const b=f.slice(i, i+MAX_MIIS_PER_REQUEST); if(b.length>0){ try { const r=await fetch(MII_API_URL,{method:"POST",headers:{'Content-Type':'application/json'},body:JSON.stringify(b)}); if(!r.ok) throw new Error(`Mii API: ${r.status}`); const d=await r.json(); for(const k of Object.keys(d)){ if(d[k]) apply_mii_image(k, d[k]); }} catch(e){ console.error("Mii fetch batch error:", e); }}}
}
async function fetch_mii_images_batch(keys) {
    // Fetch mii images using the rwfc.net batch endpoint
    let u = [...new Set(keys)].filter(Boolean), f = [];
    for (const k of u) {
        let c = get_cached_mii_image(k);
        if (c) apply_mii_image(k, c);
        else f.push(k);
    }
    
    if (f.length === 0) return;

    try {
        const r = await fetch(MII_BATCH_API_URL, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ friendCodes: f })
        });
        if (!r.ok) throw new Error(`Mii Batch API: ${r.status}`);
        const d = await r.json();
        if (d.miis) {
            for (const k of Object.keys(d.miis)) {
                if (d.miis[k]) apply_mii_image(k, d.miis[k]);
            }
        }
    } catch (e) {
        console.error("Mii batch fetch error:", e);
    }
}

// --- Footer Version Fetching ---
async function fetch_versions() { try { const r=await fetch("https://api.heyfordy.de/rr_app/version-rr"); if(r.ok) el("info-rr-version").textContent=` v${(await r.json()).version}`; } catch(e){} try { const w=await fetch("https://api.heyfordy.de/rr_app/version-ww"); if(w.ok) el("info-ww-version").textContent=` v${(await w.json()).version}`; } catch(e){} }

// --- Initialization ---
async function on_load(){
    // Page load initialization
    el('settings-btn').onclick=toggle_settings_modal;
    el('user-profile-btn').onclick=toggle_user_profile_modal;
    el('user-search-input').onkeydown = (e) => { if (e.key === 'Enter') search_user(); };
    
    load_favorites(); load_user_profile(); detect_initial_view_mode();
    el("timeout-checkbox").checked=localStorage.getItem("auto-reload")==="true";
    let p=localStorage.getItem("show-private"); p=(p===null)?true:(p==="true"); el("private-checkbox").checked=p;
    let o=localStorage.getItem("openhost"); o=(o===null)?true:(o==="true"); el("openhost-checkbox").checked=o;
    el("vr-only-checkbox").checked=localStorage.getItem("vr-only")==="true";
    let h=localStorage.getItem("show-header-stats"); h=(h===null)?true:(h==="true"); el("header-stats-checkbox").checked=h;
    let a=localStorage.getItem("show-avg-vr"); a=(a===null)?true:(a==="true"); el("avg-vr-checkbox").checked=a;
    const s=localStorage.getItem("sort-order")||"player_count"; el("sort-order-select").value=s;
    const t=localStorage.getItem("theme")||"dark"; el("theme-select").value=t; apply_theme(t);
    
    // Set default history time input value (fixes NaN on button clicks)
    let z = new Date().getTimezoneOffset() * 60000;
    let localDate = new Date(Date.now() - z);
    el("history-input").value = localDate.toISOString().slice(0, 16);

    // Show iOS hints
    const isIOS = /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1 && !window.MSStream);
    if (isIOS && !window.navigator.standalone) {
        el('ios-homescreen-hint').style.display = 'block';
    }

    fetch_versions();
    const url=new URL(location.href), ps=url.searchParams, ts=ps.get("time");
    if(ts){ 
        HISTORY_MODE=true; 
        const tsMillis = parseInt(ts) * 1000;
        HISTORY_DATE = new Date(tsMillis);
        // Overwrite the default value if 'time' param exists
        localDate = new Date(tsMillis - z);
        el("history-input").value = localDate.toISOString().slice(0, 16); 
        change_history(); 
        return; 
    }
    fetch_rooms(); on_checkbox();

    // Report Form Logic
    el('report-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
        const statusEl = el('rr-report-status');
        statusEl.style.display = 'none';

        const fc = el('rr-report-fc-hidden').value;
        const miiName = el('rr-report-miiName-hidden').value;
        const category = el('rr-report-category').value;
        const otherDescription = el('rr-report-otherDescription').value;
        const additionalDetails = el('rr-report-reason').value;
        const fileInput = el('rr-report-file');
        const file = fileInput.files[0];

        try {
            if (file && file.size > 8 * 1024 * 1024) {
                throw new Error('File size must be less than 8MB');
            }
            const categoryLabels = { 'offensive-mii-name': '🚫 Offensive Mii Name', 'cheating': '🎮 Cheating', 'emulator-speedup': '⚡ Emulator Speed Up', 'trolling': '😈 Trolling', 'targeting': '🎯 Targeting', 'other': '❓ Other' };
            const categoryLabel = categoryLabels[category] || category;

            const fields = [
                { name: '👤 Mii Name', value: miiName, inline: true },
                { name: '🎮 Friend Code', value: fc, inline: true },
                { name: '📋 Category', value: categoryLabel, inline: false }
            ];
            if (category === 'other' && otherDescription) fields.push({ name: '📝 Description', value: otherDescription, inline: false });
            if (additionalDetails) fields.push({ name: '📄 Additional Details', value: additionalDetails, inline: false });

            const embed = { title: '⚠️ Player Report', color: 0xe74c3c, fields: fields, timestamp: new Date().toISOString(), footer: { text: 'Retro Rewind Report System' } };
            const formData = new FormData();
            formData.append('payload_json', JSON.stringify({ embeds: [embed] }));
            if (file) formData.append('file', file);

            const response = await fetch(DISCORD_WEBHOOK_URL, { method: 'POST', body: formData });
            if (!response.ok) throw new Error('Failed to submit report');

            statusEl.className = 'report-status success';
            statusEl.textContent = '✅ Report submitted successfully!';
            statusEl.style.display = 'block';
            setTimeout(close_report_modal, 2000);

        } catch (error) {
            console.error('Error submitting report:', error);
            statusEl.className = 'report-status error';
            statusEl.textContent = '❌ ' + (error.message || 'Failed to submit report. Please try again.');
            statusEl.style.display = 'block';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Report';
        }
    });

    el('rr-report-cancel').onclick = close_report_modal;

    el('rr-report-category').addEventListener('change', (e) => {
        const otherGroup = el('rr-other-description-group');
        const otherInput = el('rr-report-otherDescription');
        const detailsGroup = el('rr-additional-details-group');
        if (e.target.value === 'other') {
            otherGroup.style.display = 'block';
            otherInput.required = true;
            detailsGroup.style.display = 'block';
        } else if (e.target.value === '') {
            otherGroup.style.display = 'none';
            otherInput.required = false;
            otherInput.value = '';
            detailsGroup.style.display = 'none';
        } else {
            otherGroup.style.display = 'none';
            otherInput.required = false;
            otherInput.value = '';
            detailsGroup.style.display = 'block'; // Show details for all *except* 'other' and 'select'
        }
    });
}

// --- Main Data Fetching (fetch_rooms) ---
async function fetch_rooms() {
    // Fetch room data from API
    console.log("Loading room data..."); clear_expired_cache(); 
    let cb=el("timeout-checkbox"), hi=el("history-indicator"), hc_main=el("history-controls-main"), tp=""; 
    if(HISTORY_MODE){ 
        let dt=el("history-input").value;
        let ht=Math.max(0, new Date(dt).getTime()); // This gets timestamp for local time
        if(isNaN(ht)) ht=0; 
        let hd=new Date(ht); 
        HISTORY_DATE=hd; 
        let us=Math.floor(hd.getTime()/1000); // This is the UTC timestamp
        let ps=new URL(location.href).searchParams; 
        ps.set("time", us); 
        history.replaceState(null, null, location.pathname+`?${ps.toString()}`); 
        tp=`?time=${us}`; 
        cb.disabled=true; 
        hi.style.display="block"; 
        hc_main.style.display="flex";
        el("rooms-container").innerHTML=""; 
        el("loading").style.display="block"; 
    } else { 
        cb.disabled=false; 
        hi.style.display="none"; 
        hc_main.style.display="none";
    } 
    try { 
        const r=await fetch(RWFC_API_URL+tp); 
        if(!r.ok) throw new Error(`RWFC API: ${r.status}`); 
        let rd=await r.json(), rms, dt=new Date(); 
        if(HISTORY_MODE){ 
            if(rd&&typeof rd.data !=='undefined'&&typeof rd.timestamp !=='undefined'){ 
                dt=new Date(rd.timestamp*1000); 
                rms=rd.data; 
                // Update input to reflect matched time
                let z=new Date().getTimezoneOffset()*60000;
                let localDate = new Date(rd.timestamp*1000 - z);
                el("history-input").value = localDate.toISOString().slice(0, 16);
                HISTORY_DATE = new Date(rd.timestamp*1000); // Set global history date to exact match
            } else { 
                rms=rd; 
                dt=HISTORY_DATE; 
            } 
        } else { 
            rms=rd; 
        } 
        if(!Array.isArray(rms)){ console.error("Room data not array:", rms); rms=[]; } 
        cur_rooms=rms; 
        reload_rooms(); 
        if (HISTORY_MODE) {
            // Set input value based on HISTORY_DATE (which is now precise)
            let zo=HISTORY_DATE.getTimezoneOffset()*60000;
            let lt=new Date(HISTORY_DATE.getTime()-zo);
            let hin=el("history-input"); 
            if(hin && !isNaN(lt.getTime())){ 
                hin.value=lt.toISOString().slice(0,16); 
            }
        }
    } catch(e){ 
        console.error("Fetch/process error:", e); 
        el("loading").textContent=`Error: ${e.message}`; 
        cur_rooms=[]; 
        reload_rooms(); 
    }
}

// --- Room Rendering (reload_rooms) ---
async function reload_rooms(){
     // Render rooms list
     let rooms=[...cur_rooms]; if(!Array.isArray(rooms)){ console.error("Cannot reload rooms."); rooms=[]; }
     const rc=el("rooms-container"); rc.innerHTML=""; const url=new URL(location.href), ps=url.searchParams, fr=ps.get("room"); let rnf=true; const isFiltered = !!fr;
     el("filter-indicator").style.display= isFiltered ?"block":"none";
     
     // Prioritize and sort rooms
     rooms = prioritize_rooms(rooms);
     
     // Filter rooms
     let final_rooms = [];
     if (fr) {
         // Filter for a specific room
         final_rooms = rooms.filter(r => r.id == fr);
     } else if (!el("private-checkbox").checked) {
         // Filter out private rooms (non-anybody)
         final_rooms = rooms.filter(r => r.type === "anybody");
     } else {
         // Show all (already sorted)
         final_rooms = rooms;
     }
     
     rooms = fix_split_rooms(final_rooms);
     
     let r_cnt=0, tp_cnt=0; let mii_keys=[];
     for(const room of rooms){
         r_cnt++; rnf=false;
         const sk=Object.keys(room.players).sort((a,b)=>{ const pA=room.players[a], pB=room.players[b]; const iA=USER_PROFILE&&pA.fc===USER_PROFILE.fc, iB=USER_PROFILE&&pB.fc===USER_PROFILE.fc; if(iA&&!iB) return -1; if(!iA&&iB) return 1; const fA=is_favorite(pA.fc), fB=is_favorite(pB.fc); if(fA&&!fB) return -1; if(!fA&&fB) return 1; const vA=parseInt(pA.ev,10)||0, vB=parseInt(pB.ev,10)||0; return vB-vA; });
         
         // Calculate room status
         let icon = room.type == "anybody" ? "🌎" : "🔒";
         let jn = "✅ Joinable", jc = "joinable";
         const pc = sk.length; // Use sorted keys length
         if (room.split) {
             jn = "⛓️ Split Room"; jc = "split-room";
         } else if (room.type !== "anybody" && room.suspend) { // Private + Suspend
             jn = "❌ Not Joinable"; jc = "not-joinable";
         } else if (room.type === "anybody" && room.suspend) { // Public + Suspend
             jn = "🗺️ Course selection"; jc = "course-selection";
         } else if (pc >= 12) { // Full (covers public-not-suspend and private-not-suspend)
             jn = "❌ Not Joinable"; jc = "not-joinable";
         }

         var rk=room.rk||"", rk_k=rk.replace(/^(vs|bt)_/,""); if(rk_k==="vs"||rk_k==="bt") rk_k=""; var rk_h="", rk_t=""; const ti=ROOM_TYPES[rk_k]||ROOM_TYPES["-1"]; if(ti){ rk_h=`<span title="${rk||'Unknown'}" style="color: ${ti.c};">${ti.l}</span>`; rk_t=ti.l; } else if(rk){ rk_h=rk.toUpperCase(); rk_t=rk.toUpperCase(); }
         let r_ps=new URL(location.href).searchParams; r_ps.set("room", room.id); let r_l=location.pathname+`?${r_ps.toString()}`; let card=document.createElement("div"); card.className="room-card"; let head=document.createElement("div"); head.className="room-card-header"; let h_t=rk_t?`${rk_h} Room`:""; head.innerHTML=`<span class="room-name">${icon} ${h_t?'| '+h_t:''}</span><a href="${r_l}" class="room-info-link" title="Filter this room">ⓘ</a>`; card.appendChild(head); let det=document.createElement("div"); det.className="room-details"; card.appendChild(det); let pl=document.createElement("div"); pl.className="player-list"; card.appendChild(pl); let foot=document.createElement("div"); foot.className="room-card-footer"; card.appendChild(foot); rc.appendChild(card);
         
         let rm_cnt=0; let total_vr = 0; let vr_count = 0;
         for(const p_idx of sk){
             const p=room.players[p_idx];
             if(p.ev) { let vr = parseInt(p.ev,10); if (!isNaN(vr)) { total_vr += vr; vr_count++; } }
             let nm=(p.mii&&p.mii.length>0)?p.mii.length:1;
             for(let cmi=0; cmi<nm; cmi++){
                 rm_cnt++; let pr=document.createElement("div"); pr.className="player-row"; const isGuest = cmi > 0;
                 const iu=USER_PROFILE&&p.fc===USER_PROFILE.fc&&!isGuest;
                 
                 if (!isGuest) {
                     if (iu) { pr.onclick = () => toggle_user_profile_modal(); } 
                     else { pr.onclick = () => show_player_info_modal(p.fc); }
                 } else { pr.style.cursor = 'default'; }

                 let mi=document.createElement("img"); mi.className="player-mii"; mi.alt="Mii"; mi.src="empty.png"; let mk=null; if(p.mii&&p.mii[cmi]&&p.mii[cmi].data){ mk=p.mii[cmi].data; mi.setAttribute("mii-data", mk); mii_keys.push(mk); } pr.appendChild(mi);
                 let pi=document.createElement("div"); pi.className="player-info"; let pn=document.createElement("div"); pn.className="player-name"; const bn=(p.mii&&p.mii[cmi])?p.mii[cmi].name:p.name;
                 pn.innerHTML=iu?`You <small>${handle_mii_name(bn)}</small>`:handle_mii_name(get_display_name(p.fc, bn));
                 pi.appendChild(pn); let pf=document.createElement("div"); pf.className="player-fc"; pf.textContent=isGuest?"Guest":p.fc; if(p.openhost==="true"&&!isGuest){ pf.setAttribute("openhost",""); pf.title="OpenHost enabled"; } pi.appendChild(pf); pr.appendChild(pi);
                 if (!isGuest) {
                     let pv=document.createElement("div"); pv.className="player-vrbr";
                     if(p.ev && p.eb){ pv.dataset.vr=p.ev; pv.dataset.br=p.eb; } else { pv.textContent="🚫 VR/BR"; }
                     pr.appendChild(pv);
                 }
                 let mb=document.createElement("button"); mb.className="player-menu-btn"; mb.innerHTML="⋮"; mb.title="Player Menu"; mb.onclick=(e)=>{ e.stopPropagation(); toggle_player_menu(mm); };
                 let mm=document.createElement("div"); mm.className="player-menu"; const fc=isGuest?null:p.fc;
                 if(fc){
                     if (iu) {
                         // User's own profile menu
                         let bc=document.createElement("button"); bc.innerHTML="🔗 Copy FC"; bc.onclick=(e)=>{e.stopPropagation(); copy_fc(fc);}; mm.appendChild(bc);
                         let bl=document.createElement("button"); bl.innerHTML="👋 Logout"; bl.className="remove-highlight"; bl.onclick=(e)=>{e.stopPropagation(); logout_user();}; mm.appendChild(bl);
                     } else {
                         // Other player's menu
                         const iF=is_favorite(fc);
                         if (iF) {
                             const fav = FAVORITES.find(f => f.fc === fc);
                             const nickText = (fav && fav.nickname) ? "Edit Nickname" : "Set Nickname";
                             let bf_edit = document.createElement("button");
                             bf_edit.innerHTML = `✏️ ${nickText}`;
                             bf_edit.onclick=(e)=>{ e.stopPropagation(); show_nickname_modal(fc, encodeURIComponent(bn), e); };
                             mm.appendChild(bf_edit);
                         }
                         let bf=document.createElement("button"); bf.innerHTML=iF?"🚫 Remove Favorite":"⭐ Add Favorite"; bf.onclick=(e)=>iF?remove_favorite(fc, false, e):add_favorite(fc, e); if(iF) bf.classList.add("remove-highlight"); mm.appendChild(bf);
                         
                         let br = document.createElement("button");
                         br.innerHTML = "🚩 Report";
                         br.onclick = (e) => { e.stopPropagation(); show_report_modal(fc, bn); };
                         mm.appendChild(br);
                         
                         let bc=document.createElement("button"); bc.innerHTML="🔗 Copy FC"; bc.onclick=(e)=>{e.stopPropagation(); copy_fc(fc);}; mm.appendChild(bc);
                     }
                     pr.appendChild(mb); pr.appendChild(mm); 
                 }
                 if(iu) pr.classList.add("is-user"); else if(is_favorite(p.fc)) pr.classList.add("highlighted");
                 pl.appendChild(pr);
             }
         }
         tp_cnt+=rm_cnt;
         const avg_vr = (vr_count > 0) ? Math.floor(total_vr / vr_count) : 0;
         det.innerHTML = `
             <span class="room-detail-flipper" 
                   data-players="<span class='room-player-count excited'>${rm_cnt}</span> ${rm_cnt===1?'Player':'Players'} | <span class='${jc}'>${jn}</span>" 
                   data-vr="🏆 • <span class='room-player-count excited'>${avg_vr}</span> VR Avg.">
                 <span class="room-player-count excited">${rm_cnt}</span> ${rm_cnt===1?'Player':'Players'} | <span class="${jc}">${jn}</span>
             </span>`;
         foot.innerHTML=`ID: <a href="${r_l}" class="room-link">${room.id}</a> • Uptime: <span created="${room.created}">0:00:00</span>`;
     }
     el("loading").style.display="none"; if(rnf&&fr){ el("not-found-container").style.display="block"; return; } el("not-found-container").style.display="none";
     update_openhost_underline(); update_uptimes(!!uptimes_timer); start_vrbr_flipper(); start_room_detail_flipper(); update_header_stats(r_cnt, tp_cnt, isFiltered);
     fetch_mii_images(mii_keys);
}

// --- Initial Load Trigger ---
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', on_load); else on_load();