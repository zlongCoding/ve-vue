<template>
  <div class="ve-upload" :id="`${'ve-upload'}`">
    <div class="ve-img-preview-wrapper">
      <div
        v-for="(val, index) in imgs "
        :key="index"
        :style="{'backgroundImage':`url(${val.src})`}"
      >
        <span @click="deleteImg(index)"></span>
      </div>
    </div>
    <!-- @drop="handleDrop" -->
    <div class="ve-img-uploader" >
      <input
        :id="`fileInput${_uid}`"
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        :multiple="multiple"
        @change="chooseImage"
      />
    </div>
  </div>
</template>

<script>
import { imgLoad } from "./utils"
export default {
  name: "ve-upload",
  props: {
    // 选中多个文件上传。
    multiple: {
      type: Boolean,
      default: false
    },
    change: {
      type: Function,
      default: () => null
    },
    num: {
      type: Number,
      default: 1
    },
    width: {
      type: Number,
      default: 0
    },
    height: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      imgs: []
    }
  },
  methods: {
    deleteImg (index) {
      this.imgs.splice(index, 1)
    },
    // handleDrop (e) {
    //   let files = e.dataTransfer.files
    //   console.log(files)
    //   // this.handleFile(files)
    // },
    chooseImage (e) {
      console.log(e.target.files)

      this.readImages(e.target.files)
        .then(res => {
          console.log(res)
          this.imgs.push(...res)
          this.$emit("change", this.imgs)
          document.getElementById(`fileInput${this._uid}`).value = ""
        })
        .catch(e => {
          console.log(e)
        })
      // }
    },
    /**
     *  读取图片
     * 支持多张图片上传
     */
    readImages (files) {
      return new Promise((resolve, reject) => {
        let images = []
        for (let i = 0; i < files.length; i++) {
          if (this.num > i) {
            let reader = new FileReader()
            reader.onload = (e) => {
              images[i] = {
                file: files[i],
                src: e.target.result,
                compress: false
              }
              imgLoad(images[0].src, (width, height) => {
                if (this.width !== 0 || this.height !== 0) {
                  if (width >= this.width && height >= this.height) {
                    resolve(images)
                  }
                } else {
                  resolve(images)
                }
              })
            }
            reader.readAsDataURL(files[i])
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.ve-upload {
  display: flex;
  flex-wrap: wrap;
}
@mixin client {
  width: 100px;
  height: 100px;
}
.ve-img-preview-wrapper {
  display: flex;
  div {
    @include client;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 20px;
    position: relative;
    &:hover{
       span{
         display: block;
       }
    }
    span {
      position: absolute;
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 1px solid #aaa;
      right: 5px;
      top: 5px;
      display: none;
      border-radius: 50%;
      cursor: pointer;
      transition: all .3s;
      &:hover{
        transform: scale(.8);
      }
      &::after {
        content: "";
        position: absolute;
        display: block;
        width: 12px;
        height: 2px;
        background: #aaa;
        left: 4px;
        top: 9px;
        transform: rotate(45deg);
      }
      &::before {
        content: "";
        display: block;
        width: 12px;
        height: 2px;
        background: #aaa;
        position: absolute;
        left: 4px;
        top: 9px;
        transform: rotate(-45deg);
      }
    }
  }
}
.ve-img-uploader {
  @include client;
  position: relative;
  background: #e6e6e6;
  &::after {
    content: "";
    width: 2px;
    height: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #aaa;
  }
  &::before {
    content: "";
    height: 2px;
    width: 20px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #aaa;
  }
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
</style>
