
import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap  from 'gsap'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

let sc=new THREE.Scene()
let gui=new GUI({title:' glasses changes'})
let parametr={
    glasseshandle:'#000000',
    frame:'#000000',
    eyeglasses:'#000000'

}

let model=null;
let  gltf=new GLTFLoader()
let draco=new DRACOLoader()
draco.setDecoderPath('/draco/')
gltf.setDRACOLoader(draco)
gltf.load('modelsglass/gltf/rayban.gltf',(glass)=>{
sc.add(glass.scene)
model=glass.scene
let n=0.5
model.scale.set(n,n,n)
model.rotation.y=Math.PI*0.5
//console.log(model)
//model.children[2].visible=falseبااین فهمیدیم که فرزند 2 فریم هست چون بااین دستور فریم پاک شد اعداد باید امتحان بشن
//model.children[2].children[0].visible=false از دستور بالایی بهتر فریم را انتخاب کرد
//model.children[3].visible=falseفهمیدیم شیشه عینکه
model.children[0].children[1].visible=true
model.children[2].children[0].material.roughness=0//قاب براق میشه
model.children[0].children[1].material.roughness=1 //کدر میکنه دیگه انعکاس نور نداشته باشه
})
//gui
gui
.addColor(parametr,'glasseshandle')
.onChange(()=>{
    model.children[0].children[1].material.color.set(parametr.glasseshandle)
})
gui
     .addColor(parametr,'frame')
     .onChange(()=>{
     model.children[2].children[0].material.color.set(parametr.frame)
     })
     gui
         .addColor(parametr,'eyeglasses')
          .onChange(()=>{
    model.children[3].material.color.set(parametr.eyeglasses)
})
//light
let aml=new THREE.AmbientLight('#FFFFFF',0.5)
let direct1=new THREE.DirectionalLight('#FFFFFF',0.1)
direct1.position.set(0,0,1)
let direct2=new THREE.DirectionalLight('#FFFFFF',0.1)
direct2.position.set(0,0,-1)
let direct3=new THREE.DirectionalLight('#FFFFFF',0.1)
direct3.position.set(0,1,0)
let direct4=new THREE.DirectionalLight('#FFFFFF',0.1)
direct4.position.set(0,-1,0)
let direct5=new THREE.DirectionalLight('#FFFFFF',0.1)
direct5.position.set(1,0,0)
let direct6=new THREE.DirectionalLight('#FFFFFF',0.1)
direct6.position.set(-1,0,0)
sc.add(aml,direct1,direct2,direct3,direct4,direct5,direct6)
let size = {
    width : window.innerWidth,
    height : window.innerHeight
}


window.addEventListener('resize',()=>{
    size.width = window.innerWidth
    size.height = window.innerHeight
    camera.aspect = size.width / size.height
    camera.updateProjectionMatrix()
    renderer.setSize(size.width,size.height)
})



let camera = new THREE.PerspectiveCamera(75,size.width/size.height)
camera.position.set(0,0.3,3)
sc.add(camera)

const canvas = document.querySelector('.web')

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
    canvas,
    alpha:true
  });
// const renderer = new THREE.WebGLRenderer({
//     canvas,
//     antialias:true,
// })

renderer.setSize(size.width,size.height)
renderer.toneMapping=THREE.LinearToneMapping
renderer.toneMappingExposure=2

let orbit = new OrbitControls(camera,canvas)
orbit.enableDamping = true
// orbit.minDistance = 2
// orbit.maxDistance = 3.5


let clock = new THREE.Clock()

let animation = ()=>{
    
    let elaps = clock.getElapsedTime()

   if(model){
    //model.rotation.y=elaps//عینک میچرخه
   }


    orbit.update()
    renderer.render(sc,camera)
    window.requestAnimationFrame(animation)
}
animation()