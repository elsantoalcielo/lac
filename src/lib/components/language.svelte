<script lang="ts">

  export let language: string;

  const onChange = (event: any) => {
    location.replace(`${location.pathname}?l=${event.target.value}`);
  }

</script>

<select bind:value={language} on:change={onChange}>
  <option value="ca">català</option>
  <option value="es">castellano</option>
  <option value="en">english</option>
  <option value="fi">suomi</option>
  <option value="ko">한국어</option>
</select>