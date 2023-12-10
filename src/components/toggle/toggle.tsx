import style from "./style.module.scss";

export default function Toggle({ enabled, toggle }: ToggleProps) {
	return (
		<label class={style.pureMaterialSwitch}>
			<input type="checkbox" checked={enabled} onChange={e => toggle(e.currentTarget.checked)} />
			<span />
		</label>
	);
}

interface ToggleProps {
	enabled: boolean;
	toggle(enabled: boolean): void;
}
