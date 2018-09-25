<template>
</template>
<script>
  import {setIdToken, setAccessToken, setUserInfo} from '../utils/auth';

export default {
  name: '',

  mounted() {
    this.$nextTick(() => {
      setAccessToken();
      setIdToken();
      setUserInfo(this);
    });
    window.location.href = '/';
  },
};
</script>
