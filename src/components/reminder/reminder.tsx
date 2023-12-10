import classnames from "classnames";
import { DateTime } from "luxon";
import { useState } from "preact/hooks";
import { WildernessFlashEvent } from "../../model/events";
import Toggle from "../toggle/toggle";
import style from "./style.module.scss";

export default function Reminder({ event, dateTime, enabled = true, toggle, isCurrent, isNext }: ReminderProps) {
	const [isEnabled, setIsEnabled] = useState(enabled);

	return (
		<div class={classnames(style.reminder, {
			[style.disabled]: !isEnabled,
			[style.current]: isCurrent,
			[style.next]: isNext,
		})}>
			<div>
				<div>
					<span class={style.hours}>{dateTime.toFormat("h:mm")}</span>
					<span class={style.meridiem}>{dateTime.toFormat("a")}</span>
				</div>
				<span class={style.date}>{dateTime.toRelativeCalendar({ locale: "en" })}</span>
			</div>
			<div>
				<span class={style.event}>{event}</span>
			</div>
			<div class={style.spacer} />
			<div>
				<Toggle enabled={isEnabled} toggle={setIsEnabled} />
			</div>
		</div>
	);
}

interface ReminderProps {
	event: WildernessFlashEvent;
	dateTime: DateTime;
	enabled?: boolean;
	toggle(enabled: boolean): void;
	isCurrent?: boolean;
	isNext?: boolean;
}
