<script>
  import NavToggler from '../components/NavToggler.svelte';
  import Nav from '../components/Nav.svelte';
  export let segment;
  import {onMount} from 'svelte';

  let active = false;
  let adamIsObserving;

  function handleClick() {
    active === true ? (active = false) : (active = true);
  }

  function closeMobileNav() {
    active = false;
  }

  onMount(() => {
    if (!('IntersectionObserver' in window)) {return}
    const observer = new IntersectionObserver(function(entries) {
      if (entries[0].intersectionRatio === 0) {
        adamIsObserving = true;
      } else if (entries[0].intersectionRatio === 1) {
        adamIsObserving = false;
      }
    }, { threshold: [0,1] });
    observer.observe(document.querySelector('.adam-is-doing-experiments-on-people'));
  });
</script>

<style>
  .header {
    position: fixed;
    width: 100vw;
    z-index: 10;
    top: 0;
    left: 0;
    transition: background 200ms ease-in;
    background: transparent;
  }

  .header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    height: 64px;
  }

  .logo {
    cursor: pointer;
    display: flex;
    transition: all 200ms ease-in;
  }

  .nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    max-width: 100vw;
    transition: all 0.7s cubic-bezier(0.25, 1, 0.35, 1) 0s;
    transform: translateX(100vw);
    min-height: 100vh;
    background-color: #151515;
    padding: 40px 40px 0;
  }

  .nav-is-open .nav {
    transform: translateX(0);
  }

  .adam--is-observing {
    background-color: #252525;
  }



  @media only screen and (min-width: 768px) {
    .toggler {
      display: none;
    }

    .nav {
      display: flex;
      position: static;
      transform: translateX(0);
      min-height: auto;
      width: 100%;
      padding: 0 20px 0;
      justify-content: center;
      background-color: transparent;
    }

    .header__inner {
      padding-top: 16px;
      padding-bottom: 0;
      height: auto;
      flex-direction: column;
      justify-content: center;
    }

    .adam--is-observing .logo{
      display: none;
    }
  }
</style>

<div class="adam-is-doing-experiments-on-people"></div>
<header class="header {active ? 'nav-is-open' : ''} {adamIsObserving ? 'adam--is-observing' : ''}">

  <div class="header__inner">
    <a href="." class="logo">
      <img alt="Logo" src="/img/logo.png" />
    </a>
    <div class="nav">
      <Nav {segment} on:click={closeMobileNav} />

    </div>

    <div class="toggler">
      <NavToggler on:click={handleClick} />
    </div>
  </div>
</header>
