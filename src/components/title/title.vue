<template>
  <div class="header-title">
    <div class="line"></div>
    <div class="text">{{content}}</div>
    <div class="line"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      content: {
        type: String
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .header-title
    display: flex
    margin: 28px auto 24px auto
    width: 80%
    .line
      flex: 1
      position: relative
      top: -6px
      border-bottom: 1px solid rgba(250, 250, 250, .2)
    .text
      flex: 1
      padding: 0 12px
      text-align: center
      font-size: 14px
      font-weight: 700
</style>
