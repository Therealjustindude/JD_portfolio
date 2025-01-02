// @ts-nocheck
import { writable } from 'svelte/store';

const notifications = writable([]);

function addNotification(notification, timeout = 2000) {
	notifications.update((n) => [...n, notification]);
	setTimeout(() => {
		notifications.update((n) => n.filter((n) => n !== notification));
	}, timeout);
}

function removeNotification(notification) {
	notifications.update((n) => n.filter((n) => n !== notification));
}

export { notifications, addNotification, removeNotification };
