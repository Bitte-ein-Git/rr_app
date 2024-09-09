import { useEffect, useState } from "react";

import dayjs from "dayjs";
import relativetime from "dayjs/plugin/relativeTime";
import { useInterval } from "@mantine/hooks";

dayjs.extend(relativetime);

const useDuration = (
	initialDate?: Date,
	withoutSuffix?: boolean
): { duration: string | undefined; setDate: React.Dispatch<React.SetStateAction<Date | undefined>> } => {
	const [date, setDate] = useState<Date | undefined>(initialDate);
	const [duration, setDuration] = useState<string | undefined>();

	const interval = useInterval(() => setDuration(dayjs(date).from(dayjs(new Date()), withoutSuffix)), 10000);

	useEffect(() => {
		if (date) {
			setDuration(dayjs(date).from(dayjs(new Date()), withoutSuffix));
			interval.start();
		}

		return interval.stop;
	}, [date, interval, withoutSuffix]);

	return { duration, setDate };
};

export default useDuration;
