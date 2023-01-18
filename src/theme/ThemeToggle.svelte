<script>
  import { getContext } from 'svelte'
  const { toggle } = getContext('theme')
</script>

<!-- <button on:click="{toggle}" /> -->
<label class="switch">
  <input type="checkbox" on:click="{toggle}">
  <span class="slider round"></span>
</label>

<style>
  /* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 10px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--theme-palette-primary);
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 10px;
  width: 10px;
  background-color: var(--theme-palette-secondary);
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--theme-palette-primary);
}

input:focus + .slider {
  box-shadow: 1px 1px var(--theme-palette-shadow-light);
}

input:checked + .slider:before {
  -webkit-transform: translateX(16px);
  -ms-transform: translateX(16px);
  transform: translateX(16px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
  box-shadow: 1px 1px var(--theme-palette-shadow-light);

}

.slider.round:before {
  border-radius: 50%;
}

/* When the browser is above 910px */
@media screen and (min-width: 910px) {
  input:checked + .slider:before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
  }
}

/* When the browser is below 600px */
@media screen and (max-width: 600px) {
  input:checked + .slider:before {
    -webkit-transform: translateX(12px);
    -ms-transform: translateX(12px);
    transform: translateX(12px);
  }
}

/* When the browser is below 600px */
@media screen and (max-width: 450px) {
  .switch {
    width: 36px;
  }
}

@media screen and (max-width: 380px) {
  .switch {
    width: 40px;
  }
}

@media screen and (max-width: 295px) {
  input:checked + .slider:before {
    -webkit-transform: translateX(16px);
    -ms-transform: translateX(16px);
    transform: translateX(16px);
  }
  .switch {
    width: 24px;
  }
}
</style>