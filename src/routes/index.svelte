<script>
  import HeroBanner from '../components/Banner.svelte';
  import Overview from '../components/Overview.svelte';
  import OpenHours from '../components/OpenHours.svelte';
</script>

<style>

</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<div>
  <HeroBanner 
    bannerSubtitle="You should come and taste for yourself"
    bannerTitle="Welcome"
    themeBannerHeight="hero-banner--full-height"
    hasButton="true"
    bannerImg="hero-banner--homepage" />
  <Overview />
  <OpenHours />
</div>
