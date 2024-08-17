<script lang="ts">
  import { Button } from 'bits-ui';
  console.log('hello from the popup!');
</script>

<div>
  <h1>My New Web Extension</h1>
  <Button.Root
    class="inline-flex h-12 items-center justify-center rounded-input bg-dark
  px-[21px] text-[15px] font-semibold text-background shadow-mini
  hover:bg-dark/95 active:scale-98 active:transition-all"
  >
    Unlimited
  </Button.Root>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
  }
</style>
