import { DateTime } from "luxon";

export enum WildernessFlashEvent {
	BUTTERFLY_SWARM = "Butterfly Swarm",
	KING_BLACK_DRAGON_RAMPAGE = "King Black Dragon Rampage",
	FORGOTTEN_SOLDIERS = "Forgotten Soldiers",
	SURPRISING_SEEDLINGS = "Surprising Seedlings",
	HELLHOUND_PACK = "Hellhound Pack",
	INFERNAL_STAR = "Infernal Star",
	LOST_SOULS = "Lost Souls",
	RAMOKEE_INCURSION = "Ramokee Incursion",
	DISPLACED_ENERGY = "Displaced Energy",
	EVIL_BLOODWOOD_TREE = "Evil Bloodwood Tree",
	SPIDER_SWARM = "Spider Swarm",
	UNNATURAL_OUTCROP = "Unnatural Outcrop",
	DEMON_STRAGGLERS = "Demon Stragglers",
}

const startTime = DateTime.utc(2023, 10, 17, 13, 0, 0, 0);
export const events = ([
	[WildernessFlashEvent.DEMON_STRAGGLERS, startTime.plus({ hours: 0 })],
	[WildernessFlashEvent.BUTTERFLY_SWARM, startTime.plus({ hours: 1 })],
	[WildernessFlashEvent.KING_BLACK_DRAGON_RAMPAGE, startTime.plus({ hours: 2 })],
	[WildernessFlashEvent.FORGOTTEN_SOLDIERS, startTime.plus({ hours: 3 })],
	[WildernessFlashEvent.SURPRISING_SEEDLINGS, startTime.plus({ hours: 4 })],
	[WildernessFlashEvent.HELLHOUND_PACK, startTime.plus({ hours: 5 })],
	[WildernessFlashEvent.INFERNAL_STAR, startTime.plus({ hours: 6 })],
	[WildernessFlashEvent.LOST_SOULS, startTime.plus({ hours: 7 })],
	[WildernessFlashEvent.RAMOKEE_INCURSION, startTime.plus({ hours: 8 })],
	[WildernessFlashEvent.DISPLACED_ENERGY, startTime.plus({ hours: 9 })],
	[WildernessFlashEvent.EVIL_BLOODWOOD_TREE, startTime.plus({ hours: 10 })],
	[WildernessFlashEvent.SPIDER_SWARM, startTime.plus({ hours: 11 })],
	[WildernessFlashEvent.UNNATURAL_OUTCROP, startTime.plus({ hours: 12 })],
] as const);

export function getNextEvents(at: DateTime) {
	if(at < startTime) throw new Error("Cannot get events before start time");
	const hoursOffset = Math.floor(at.diff(startTime, "hours").hours);

	return events
		.map(([event, time]) => [event, time.plus({ hours: hoursOffset })] as const)
		.map(([event, time]) => [event, time < at ? time.plus({ hours: events.length }) : time] as const)
		.sort(([, timeA], [, timeB]) => timeA.toMillis() - timeB.toMillis());
}
