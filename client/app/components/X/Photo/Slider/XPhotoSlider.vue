<script setup>
const props = defineProps({
    photos: {
        type: Array,
        default: () => []
    },
    previewImage: {
        type: Object,
        default: () => ({})
    }
});


const preview = ref({});
const viewPhotos = ref([]);

const prevImage = ref(0);
const nextImage = ref(3);
const numberOfPhotos = ref(3);


function openPreview(item) {
    preview.value.id = item.id;
    preview.value.index = item.index;
    preview.value.name = item.name;
    preview.value.src = item.src;
}

function next(index) {

    if(index + 1 < props.photos?.length) {
        index ++;
    } else {
        index = 0;
    }

    props.photos.forEach(item => {
        if(item.index === index) {
            openPreview(item);
        }
    });

    nextImages() 
}

function previous(index) {
    if(index > 0) {
        index --;
    } else {
        index = props.photos?.length - 1;
    }

    props.photos.forEach(item => {
        if(item.index === index) {
            openPreview(item);
        }
    });
    prevImages()
}

// function close() {
//     viewPhotos.value = [];
//     props.previewImage = {};
//     props.photos = [];
// }

function allPhotos() {
    const photos = [];

    if(props.photos?.length >= numberOfPhotos.value) {
        props.photos.forEach((item , index) => {
            if(index >= prevImage.value && index <= nextImage.value) {
                photos.push(item);
            }
        })

        viewPhotos.value = photos
    } else {
        viewPhotos.value = props.photos;
    }
}

function prevImages() {
    if(nextImage.value >= numberOfPhotos.value+1) {
        prevImage.value--;
        nextImage.value--;

    } else {
        if(prevImage.value === 0) {
            prevImage.value = props.photos?.length-1;
        } else if(nextImage.value === 0) {
            prevImage.value --;

            nextImage.value = props.photos?.length
        } else {
            prevImage.value --;
        }
        nextImage.value--;
    }
    // console.log('prev : '+ prevImage.value + ', next: ' +nextImage.value )

    viewPhotos.value.pop();
    viewPhotos.value.unshift(props.photos[prevImage.value])
}

function nextImages() {
    if(nextImage.value <= props.photos?.length-2 ) {
        if(prevImage.value === props.photos?.length -1) {
            prevImage.value = 0;
        } else {
            prevImage.value++;
        }
        nextImage.value++;
    } else {
        if( nextImage.value === props.photos?.length -1) {
            nextImage.value = 0;
        }else if(prevImage.value === props.photos?.length -1) {
            prevImage.value = 1;
            nextImage.value++;
        } else {
            nextImage.value ++;
        }

        prevImage.value++;
    }
    // console.log('prev : '+ prevImage.value + ', next: ' +nextImage.value )
    viewPhotos.value.shift();
    viewPhotos.value.push(props.photos[nextImage.value]);
}

onMounted(() =>  {
    preview.value.id = props.previewImage.id;
    preview.value.index = props.previewImage.index;
    preview.value.name = props.previewImage.name;
    preview.value.src = props.previewImage.src;
    allPhotos()
})
</script>

<template>
    <div class="relative w-full h-full z-10 flex flex-col justify-start items-center">
        <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <!--
                <div  @click="" class="w-10 h-full flex justify-center items-center cursor-pointer hover:bg-slate-600/30">
                    <Icon name="material-symbols:arrow-back-ios-new" class="text-3xl"></Icon>
                </div>
                <div class="h-full w-full">
                    <img class="absolute top-0 left-0 h-full w-full object-cover -z-1" :src="preview.src" :alt="preview.alt" />
                    <div class="h-full w-full bg-gradient-to-r from-prime-light/60 to-second-light/100 dark:from-prime-dark/60 dark:to-second-dark/100 "></div>
                </div>
            -->

            <!--
            
                <div v-if="preview.index + 1 <= photos?.length"  @click="next(preview.index)" class="w-10 h-full flex justify-center items-center cursor-pointer hover:bg-slate-600/30">
                    <Icon name="material-symbols:arrow-forward-ios" class="text-3xl text-white"></Icon>
                </div>
            -->
        </div>

        <div class="absolute bottom-20 right-10 flex flex-col justify-center items-start space-y-6">
            <div class="py-4 mx-auto h-70 flex flex-row justify-center items-center space-x-6 ">

                <div v-for="photo in viewPhotos" :key="photo.id" class="h-full w-40 flex justify-center items-center my-4 rounded-lg  ">
                    <img
                        :alt="photo.alt"
                        :class="[photo.index === preview.index ? 'border overflow-none border-active -translate-x-150 -translate-y-60 w-200 h-200' : 'h-full w-full scale-100 ']"
                        :src="photo.src"
                        class="object-cover rounded-lg transition-all duration-500 ease-linear"
                    >
                </div>
            </div>

            <div class="w-full flex justify-center translate-x-[-20%] space-x-4">
                <x-btn @click="next(preview.id)" class="rounded-full" icon strip>
                    <Icon name="ic:sharp-arrow-circle-left" class="text-4xl text-slate-400 hover:text-slate-300" />
                </x-btn>

                <x-btn @click="previous(preview.id)" class="rounded-full" icon strip>
                    <Icon name="ic:sharp-arrow-circle-right" class="text-4xl text-slate-400 hover:text-slate-300" />
                </x-btn>
            </div>

            <!--
                <div v-if="viewPhotos?.length > 3" @click="nextImages()" class="h-full p-3 flex justify-center items-center cursor-pointer hover:bg-slate-600/30">
                    <Icon name="material-symbols:arrow-forward-ios" class="text-3xl text-white"></Icon>
                </div>
            -->
            <!--
                <div v-if="viewPhotos?.length > 3" @click="prevImages()" class="h-full p-3 flex justify-center items-center cursor-pointer hover:bg-slate-600/30">
                    <Icon name="material-symbols:arrow-back-ios-new" class="text-3xl"></Icon>
                </div>
            -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.left-enter-active {
    animation: leftInAnimation 0.4s ease-in-out;
}
.left-leave-active {
    animation: leftOutAnimation 0.4s ease-in-out;
}

@keyframes leftInAnimation {
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
}

@keyframes leftOutAnimation {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-100%);
    }
}
</style>
