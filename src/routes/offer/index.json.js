/* import posts from './_posts.js';

const contents = JSON.stringify(posts.map(post => {
	return {
		title: post.title,
		slug: post.slug
	};
}));

export function get(req, res) {
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.end(contents);
} */
import fetch from 'node-fetch';
import send from '@polka/send';
import {baseurl, refid} from '../../stores.js';

export function get(req, res) {
  let url_value, ref_value;

  refid.subscribe(value => {
    ref_value = value;
    url_value =
      baseurl + '/documents/search?fetchLinks=category.title&ref=' + ref_value;
    if (ref_value != undefined) {
      fetch(`${url_value}&q=%5B%5Bat(document.type%2C%20"product")%5D%5D`)
        .then(r => r.json())
        .then(items => {
          const groupedPosts = items.results.reduce(reduceCategories, {});
          send(res, 200, JSON.stringify(groupedPosts), {
            'Cache-Control': `max-age=0, s-max-age=${600}`, // 10 minutes
            'Content-Type': 'application/json',
          });
        });
    }
  });
  if (ref_value === undefined) {
    fetch(baseurl)
      .then(r => r.json())
      .then(item => {
        refid.set(item.refs[0].ref);
      });
  }
}
function reduceCategories(list, {data}) {
  if (!data.categories[0].link.data) {
    console.log('malformed', data);
    return list;
  }
  const {categories, title, image, price, description} = data;
  const categoryName = categories[0].link.data.title[0].text;
  const mealName = title[0].text;
  const descriptionText = description[0].text;

  return {
    ...list,
    [categoryName]: (list[categoryName] || []).concat({
      name: mealName,
      image,
      price,
      description: descriptionText,
    }),
  };
}
