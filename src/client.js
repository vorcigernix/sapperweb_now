import * as sapper from '@sapper/app';
import { googleAnalytics } from './anal.js';

sapper.start({
	target: document.querySelector('#sapper')
});
googleAnalytics('UA-134288088-2');