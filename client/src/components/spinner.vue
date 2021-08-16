<template>
<div class="boxes">
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <a class="dribbble" href="https://dribbble.com/shots/5533600-Loading-boxes" target="_blank"><img src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg" alt=""></a>
</div>

<!-- dribbble -->
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
$color: #ED4036;
$colorRight: darken(#ED4036, 15%);
$colorLeft: darken(#EB008A, 5%);
$shadow:#9aa5b3;

.boxes {
--size: 32px;
    --duration: 800ms;
    height: calc(var(--size) * 2);
    width: calc(var(--size) * 3);
    position: absolute;
    margin: 0;
    left: 50%;
    top: 192px;
    /* top: 96%; */
    transform-style: preserve-3d;
    transform-origin: 50% 50%;
    margin-top: calc(var(--size) * 1.5 * -1);
    transform: rotateX(60deg) rotateZ(45deg) rotateY(0deg) translateZ(0px);
    .box {
        width: var(--size);
        height: var(--size);
        top: 0;
        left: 0;
        position: absolute;
        transform-style: preserve-3d;
        &:nth-child(1) {
            transform: translate(100%, 0);
            animation: box1 var(--duration) linear infinite;
        }
        &:nth-child(2) {
            transform: translate(0, 100%);
            animation: box2 var(--duration) linear infinite;
        }
        &:nth-child(3) {
            transform: translate(100%, 100%);
            animation: box3 var(--duration) linear infinite;
        }
        &:nth-child(4) {
            transform: translate(200%, 0);
            animation: box4 var(--duration) linear infinite;
        }
        & > div {
            --background: #{$color};
            --top: auto;
            --right: auto;
            --bottom: auto;
            --left: auto;
            --translateZ: calc(var(--size) / 2);
            --rotateY: 0deg;
            --rotateX: 0deg;
            position: absolute;
            width: 100%;
            height: 100%;
            background: var(--background);
            top: var(--top);
            right: var(--right);
            bottom: var(--bottom);
            left: var(--left);
            transform: rotateY(var(--rotateY)) rotateX(var(--rotateX)) translateZ(var(--translateZ));
            &:nth-child(1) {
                --top: 0;
                --left: 0;
            }
            &:nth-child(2) {
                --background: #{$colorRight};
                --right: 0;
                --rotateY: 90deg;
            }
            &:nth-child(3) {
                --background: #{$colorLeft};
                --rotateX: -90deg;
            }
            &:nth-child(4) {
                --background: #{$shadow};
                --top: 0;
                --left: 0;
                --translateZ: calc(var(--size) * 3 * -1);
            }
        }
    }
}

@keyframes box1 {
    0%,
    50% {
        transform: translate(100%, 0);
    }
    100% {
        transform: translate(200%, 0);
    }
}

@keyframes box2 {
    0%{
        transform: translate(0, 100%);
    }
    50% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(100%, 0);
    }
}

@keyframes box3 {
    0%,
    50% {
        transform: translate(100%, 100%);
    }
    100% {
        transform: translate(0, 100%);
    }
}

@keyframes box4 {
    0%{
        transform: translate(200%, 0);
    }
    50% {
        transform: translate(200%, 100%);
    }
    100% {
        transform: translate(100%, 100%);
    }
}

html {
    -webkit-font-smoothing: antialiased;
}

* {
    box-sizing: border-box;
    &:before,
    &:after {
        box-sizing: border-box;
    }
}

// Center & dribbble
body {
    min-height: 100vh;
    font-family: Roboto, Arial;
    color: #ADAFB6;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F9FBFF;
    .dribbble {
        position: fixed;
        display: block;
        right: 20px;
        bottom: 20px;
        img {
            display: block;
            height: 28px;
        }
    }
}
</style>