<template>
</template>
<script>
  import {setIdToken, setAccessToken, setUserInfo} from '../utils/auth';

export default {
  name: '',

  mounted() {
    this.$nextTick(() => {
      this.$session.start();
      setAccessToken();
      setIdToken();
      setUserInfo(this);
    });
    window.location.href = '/';
  },
};
</script>
