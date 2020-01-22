<template>
  <div id="notfound" v-if="error.statusCode === 404">
    <div class="notfound">
      <div class="notfound-404">
        <h3>Oops! Page not found</h3>
        <h1>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </h1>
      </div>
      <h2>we are sorry, but the page you requested was not found</h2>
      <NuxtLink to="/">Home page</NuxtLink>
    </div>
  </div>
  <h1 v-else>{{ otherError }}</h1>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  }
}
</script>

<style lang="scss">
#notfound {
  position: relative;
  height: 100vh;
  .notfound {
    position: absolute;
    width: 100%;
    line-height: 1.4;
    text-align: center;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    .notfound-404 {
      position: relative;
      height: 240px;
      h1 {
        font-family: 'Montserrat', sans-serif !important;
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        font-size: 252px !important;
        font-weight: 900 !important;
        margin: 0px;
        color: #1976d2;
        text-transform: uppercase;
        letter-spacing: -40px;
        margin-left: -20px;
        font-style: normal !important;
      }
      h3 {
        font-family: 'Cabin', sans-serif;
        position: relative;
        font-size: 16px;
        font-weight: 700;
        text-transform: uppercase;
        color: #000;
        margin: 0px;
        letter-spacing: 3px;
        padding-left: 6px;
      }
      h1 > span {
        text-shadow: -8px 0px 0px rgba(255, 255, 255, 0.5);
      }
    }
    h2 {
      font-family: 'Cabin', sans-serif;
      font-size: 20px;
      font-weight: 400;
      text-transform: uppercase;
      color: #000;
      margin-top: 0px;
      margin-bottom: 25px;
    }
  }
  @media(max-width: 767px) {
    .notfound {
      .notfound-404 {
        height: 200px !important;
        h1 {
          font-size: 200px !important;
        }
      }
    }
  }

  @media(max-width: 480px) {
    .notfound {
      .notfound-404 {
        height: 162px !important;
        h1 {
          font-size: 162px !important;
          height: 150px !important;
          line-height: 162px !important;
        }
        h2 {
          font-size: 16px !important;
        }
      }
    }
  }
}
</style>
