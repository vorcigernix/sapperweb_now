<script context="module">
  export function preload({params, query}) {
    return this.fetch(`offer.json`)
      .then(r => r.json())
      .then(posts => {
        //console.log(posts);
        return {posts: Object.entries(posts)};
      });
  }
</script>

<script>
  import PageTitle from '../../components/PageTitle.svelte';
  import {fade} from 'svelte/transition';
  import Product from '../../components/Products.svelte';
  import HeroBanner from '../../components/Banner.svelte';
  export let posts;

  let current;
</script>

<style>
  section {
    text-align: center;
    padding-top: 54px;
    padding-bottom: 32px;
    background-color: #f4f4f4;
  }

  .category {
    margin-top: 40px;
  }

  .category__item {
    margin-bottom: 24px;
    text-align: left;
  }

  .category__title {
    letter-spacing: 1px;
    padding: 8px 24px 8px 31px;
    text-transform: uppercase;
    cursor: pointer;
    border: 5px solid #252525;
    background: #ffffff;
    transition: all 0.5s ease-in-out 0s;
    font-size: 32px;
    color: #252525;
    font-weight: 700;
    position: relative;
  }

  .category__title:hover {
    background: #252525;
    color: #fff;
  }

  .category__title:hover:after,
  .category__title:hover:before {
    background: #fff;
  }

  .category__item--active .category__title:after {
    transform: rotate(-45deg);
    background: #fff;
  }

  .category__item--active .category__title:before {
    transform: rotate(45deg);
    background: #fff;
  }

  .category__title:after,
  .category__title:before {
    position: absolute;
    content: '';
    width: 10px;
    height: 3px;
    left: 6px;
    top: 50%;
    background-color: #252525;
    transform: rotate(45deg);
    transition: all 0.2s ease-in-out 0s;
  }

  .category__title:before {
    transform: rotate(-45deg);
    left: 12px;
  }

  .item-ingredients {
    font-style: italic;
    font-size: 14px;
  }

  .items {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 16px;
    row-gap: 16px;
    padding: 16px;
    background: rgba(255, 255, 255, 1);
  }

  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .item-img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    margin-right: 10px;
    margin-bottom: 15px;
  }

  .item-name {
    display: flex;
    justify-content: space-between;
    position: relative;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    flex-direction: column;
  }

  .item-name__title,
  .item-name__price {
    background-color: #fff;
    z-index: 2;
  }

  .item-name__title {
    padding-right: 5px;
  }

  .item-name__price {
    padding-left: 5px;
  }

  .item-name__dots {
    position: absolute;
    top: 14px;
    left: 80px;
    right: 0;
    margin: 0;
    border: 0;
    height: 5px;
    display: block;
    background: radial-gradient(#d5d5d5 40%, transparent 10%);
    background-position: 0 0;
    background-size: 4px 4px;
    background-repeat: repeat-x;
  }

  .item > div {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  .category__content {
    display: none;
  }

  .category__item--active {
    margin-bottom: 0;
  }

  .category__item--active .category__content {
    display: block;
  }

  .category__item--active .category__title {
    background-color: #252525;
    color: white;
  }

  @media only screen and (min-width: 768px) {
    .item {
      flex-direction: row;
    }

    .item-img {
      margin-bottom: 0;
    }

    .item-name {
      flex-direction: row;
    }

    .item > div {
      display: block;
      text-align: left;
    }
  }

  @media only screen and (min-width: 992px) {
    .items {
      grid-template-columns: 1fr 1fr;
      column-gap: 32px;
      row-gap: 32px;
      padding-top: 32px;
      padding-bottom: 0;
    }

    .item {
      padding: 16px 0;
    }

    .category__item--active {
      margin-bottom: 24px;
    }
  }
</style>

<svelte:head>
  <title>offer</title>
</svelte:head>

<HeroBanner
  bannerSubtitle="Welcome to NerdCafé, a modern restaurant with a focus on
  premium food tastes"
  bannerTitle="ABOUT US"
  hasButton="false"
  bannerImg="hero-banner--offer"
  themeBannerHeight="false" />

<section>
  <div class="container" transition:fade>
    <PageTitle title="DISCOVER" subTitle="Our Menu" theme="title-dark" />

    <p>
      Explore texture, color and of course the ultimate tastes with our menu of
      the season. All the ingredients are fresh and carefully selected by our
      chefs. Enjoy an extraordinary dinning experience.
    </p>

    <ul class="category">
      {#each posts as post, i}
        <li
          class="category__item {current === i ? 'category__item--active' : ''}"
          on:click={() => (current !== i ? (current = i) : (current = null))}>
          <h4 class="category__title">{post[0]}</h4>
          <div class="category__content">
            <ul class="items">
              {#each post[1] as item, i}
                <li class="item">
                  <img src={item.image.url} class="item-img" alt="" />
                  <div>
                    <p class="item-name">
                      <span class="item-name__title">{item.name}</span>
                      <span class="item-name__dots" />
                      <span class="item-name__price">$ {item.price}</span>
                    </p>
                    <p class="item-ingredients">{item.description}</p>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        </li>
      {/each}
    </ul>
  </div>
</section>
