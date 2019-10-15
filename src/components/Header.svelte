<script>
  import NavToggler from '../components/NavToggler.svelte';
  import Nav from '../components/Nav.svelte';
  export let segment;

  let active = false;

  function handleClick() {
    active === true ? (active = false) : (active = true);
  }

  function closeMobileNav() {
    active = false;
  }
</script>

<style>
  .header {
    --background: rgba(21, 21, 21, 0.7);
    position: fixed;
    width: 100vw;
    z-index: 10;
    top: 0;
    left: 0;
    transition: background 250ms ease-in;
    background: var(--background);
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
  }

  .nav {
    position: fixed;
    top: 0;
    right: 0;
    width: 320px;
    max-width: 100vw;
    transition: all 0.7s cubic-bezier(0.25, 1, 0.35, 1) 0s;
    transform: translateX(400px);
    min-height: 100vh;
    background-color: #151515;
    padding: 40px 20px 0;
  }

  .nav-is-open .nav {
    transform: translateX(0);
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
      padding-top: 0;
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
  }
</style>

<header class="header {active ? 'nav-is-open' : ''}">

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
