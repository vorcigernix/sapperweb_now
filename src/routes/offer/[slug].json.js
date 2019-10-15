/* import posts from './_posts.js';

const lookup = new Map();
posts.forEach(post => {
	lookup.set(post.slug, JSON.stringify(post));
});

export function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	if (lookup.has(slug)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(lookup.get(slug));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
 */

import fetch from 'node-fetch';
import send from '@polka/send';

export function get(req, res) {
  const {slug} = req.params;

  fetch(
    `https://sapperweb.prismic.io/api/v2/documents/search?ref=XY32zBAAAB4Agd5X&q=%5B%5Bat(my.posts.slug%2C+%22${slug}%22)%5D%5D&format=json`
  )
    .then(r => r.json())
    .then(items => {
      send(res, 200, JSON.stringify(items.results[0]), {
        'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
        'Content-Type': 'application/json',
      });
    });
}
