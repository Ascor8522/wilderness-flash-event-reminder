import { DateTime } from "luxon";
import { useRef } from "preact/hooks";
import { WildernessFlashEvent } from "../../model/events";
import style from './style.module.scss';

export default function Controls({ event, dateTime }: ControlsProps) {
	const audioRef = useRef<HTMLAudioElement>(null);

	const _play = () => {
		const current = audioRef.current;
		if(!current) return;
		current.play();
	};

	const _stop = () => {
		const current = audioRef.current;
		if(!current) return;
		current.pause();
		current.currentTime = 0;
	};

	return (
		<div class={style.controls}>
			Alarm controls coming soon
			{/* <audio src={marimba} ref={audioRef} loop={true} />
			{!event && <span>No next reminder</span>}
			{event && <>

			</>}
			<button onClick={play}>Play</button>
			<button onClick={stop}>Stop</button> */}
		</div>
	);
}

interface ControlsProps {
	event?: WildernessFlashEvent;
	dateTime?: DateTime;
}
