<script>
  export let categoryid;
</script>

{#await categoryid}
  <p>loading pičovina</p>
{:then value}
  <!-- promise was fulfilled -->
  <p>The value is {value}</p>
{:catch error}
  <!-- promise was rejected -->
  <p>Something went wrong: {error.message}</p>
{/await}
