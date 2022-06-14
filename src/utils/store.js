import engine from 'store/src/store-engine';

import localStorage from 'store/storages/localStorage';
import sessionStorage from 'store/storages/sessionStorage';
import cookieStorage from 'store/storages/cookieStorage';

import defaultPlugin from 'store/plugins/defaults';
import expiredPlugin from 'store/plugins/expire';
import eventsPlugin from 'store/plugins/events';

const localStorages = [localStorage, cookieStorage];
const sessionStorages = [sessionStorage, cookieStorage];
const plugins = [defaultPlugin, expiredPlugin, eventsPlugin];

export const localStore = engine.createStore(localStorages, plugins);

export const sessionStore = engine.createStore(sessionStorages, plugins);
