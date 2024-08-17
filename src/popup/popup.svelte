<script>
  import '../app.css';
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
</script>

<Accordion data-theme="skeleton">
  <AccordionItem open>
    <svelte:fragment slot="lead">(icon)</svelte:fragment>
    <svelte:fragment slot="summary">(summary)</svelte:fragment>
    <svelte:fragment slot="content">(content)</svelte:fragment>
  </AccordionItem>
  <AccordionItem>
    <svelte:fragment slot="lead">(icon)</svelte:fragment>
    <svelte:fragment slot="summary">(summary)</svelte:fragment>
    <svelte:fragment slot="content">(content)</svelte:fragment>
  </AccordionItem>
  <!-- ... -->
</Accordion>
