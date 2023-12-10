import { DateTime } from "luxon";
import { useEffect, useState } from "preact/hooks";
import { events, getNextEvents } from "../../model/events";
import Controls from "../controls/controls";
import Reminder from "../reminder/reminder";
import style from "./style.module.scss";

export function App() {
	const [displayCurrent, _setDisplayCurrent] = useState(true);
	const [_time, setTime] = useState(new Date().getTime());

	useEffect(() => {
		const interval = setInterval(() => setTime(new Date().getTime()), 1000);
		return () => clearInterval(interval);
	}, []);

	const now = DateTime.utc();
	const nextEvents = getNextEvents(now);

	const currentEvent = nextEvents.at(-1)!;

	return (
		<main class={style.main}>
			<header class={style.header}>
				<h1 class={style.h1}>Runescape Wilderness Flash Events Reminders</h1>
				<h2 class={style.h2}>In-Game Time: {now.toLocaleString({ timeStyle: "short", hour12: true })}</h2>
			</header>

			<div class={style.container}>
				{displayCurrent
					&& <Reminder event={currentEvent[0]} dateTime={currentEvent[1].minus({ hours: events.length })} toggle={() => { }} isCurrent={true} />}

				{nextEvents.map(([event, dateTime], i) =>
					<Reminder key={event} event={event} dateTime={dateTime} toggle={() => { }} isNext={!i} />)}
			</div>

			<Controls />
		</main>
	);
}
