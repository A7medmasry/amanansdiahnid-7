<template>
  <ins
    class="adsbygoogle"
    :style="adStyle"
    :data-ad-client="adClient"
    :data-ad-format="adFormat"
    :data-ad-slot="adSlot"
  ></ins>
</template>

<script>
export default {
  props: {
    adStyle: {
      type: String,
      required: false,
      default: "display:block"
    },
    adClient: {
      type: String,
      required: false,
      default: "ca-pub-XXXXXXXXXX"
    },
    adFormat: {
      type: String,
      required: false,
      default: "auto"
    },
    adSlot: {
      type: String,
      required: false,
      default: "XXXXXXXX"
    }
  },
  mounted() {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }
};
</script>