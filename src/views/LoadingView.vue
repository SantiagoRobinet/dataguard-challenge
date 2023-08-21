<template>
  <div>
    <span class="loader"></span>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  display: inline-block;
  position: relative;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 6px solid;
  border-color: transparent #6773a5 #6773a5;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  animation: rotationBack 0.8s linear infinite;
  transform-origin: center center;
}
    
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
    
div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

</style>