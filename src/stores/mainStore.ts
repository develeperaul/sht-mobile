// import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { getPromotion, stories, story } from 'src/api/main'
import { DataVal } from 'src/models'
import { StoriesT, StoryT, StoryGroupT, PromotionT } from 'src/models/api/main'
import { useOnline } from '@vueuse/core'

export default defineStore('main', () => {
  const isOnline = useOnline()
  const noInt = ref(false)
  //main
  const bg = ref<string | null>('background:rgba(0,0,0,0.33)')
  const bgColor = 'rgba(0,0,0,0.33) bg'
  // start сторисы
  const storyIndex = ref<number | null>(null)
  const isStoriesActive = ref(false)
  // const storyList = ref<DataVal<StoriesT[]>>({
  //   loading: false,
  //   data: [
  //     {
  //       id: 1,
  //       title: 'string',
  //       published_at: 'string',
  //       unpublished_at: 'string',
  //       context_image: {
  //         id: 1,
  //         path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1HLt964JQLk0k-6rKs389WMjtwgYNyWggsg&s',
  //         width: '122',
  //         height: '111',
  //         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1HLt964JQLk0k-6rKs389WMjtwgYNyWggsg&s',
  //       },
  //       image: {
  //         id: 1,
  //         path: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-oM39OqBCgUncMTs88Hk7fWuEPiihQaxmw&s',
  //         width: '1221',
  //         height: '111',
  //         url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr-oM39OqBCgUncMTs88Hk7fWuEPiihQaxmw&s',
  //       },
  //     },
  //   ],
  // })
  const storyList = ref<DataVal<StoriesT[]>>({ loading: false, data: [] })
  const getStories = async () => {
    try {
      storyList.value.loading = true
      const res = (await stories()).data

      res.forEach((item) => getStory(item.id))
      storyList.value.data = res
      return res
    } catch (e) {
      throw e
    } finally {
      storyList.value.loading = false
    }
  }

  // const storyGroup = ref<DataVal<StoryGroupT>>({
  //   loading: false,
  //   data: {
  //     0: [
  //       {
  //         id: 1,
  //         title: '1',
  //         description: 'd',
  //         action: false,
  //         division: false,
  //         image: {
  //           id: 1,
  //           path: 'https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg',
  //           width: '150',
  //           height: '150',
  //         },
  //       },
  //     ],
  //     1: [
  //       {
  //         id: 2,
  //         title: '2',
  //         description: 'd',
  //         action: false,
  //         division: false,
  //         image: {
  //           id: 2,
  //           path: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
  //           width: '150',
  //           height: '150',
  //         },
  //       },
  //       {
  //         id: 2,
  //         title: '2',
  //         description: 'd',
  //         action: false,
  //         division: false,
  //         image: {
  //           id: 2,
  //           path: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg',
  //           width: '150',
  //           height: '150',
  //         },
  //       },
  //     ],
  //     2: [
  //       {
  //         id: 3,
  //         title: '3',
  //         description: 'd',
  //         action: false,
  //         division: false,
  //         image: {
  //           id: 3,
  //           path: 'https://images.pexels.com/photos/8105034/pexels-photo-8105034.jpeg',
  //           width: '150',
  //           height: '150',
  //         },
  //       },
  //       {
  //         id: 3,
  //         title: '3',
  //         description: 'd',
  //         action: false,
  //         division: false,
  //         image: {
  //           id: 3,
  //           path: 'https://images.pexels.com/photos/8105034/pexels-photo-8105034.jpeg',
  //           width: '150',
  //           height: '150',
  //         },
  //       },
  //     ],
  //   },
  // })

  const storyGroup = ref<DataVal<StoryGroupT>>({
    loading: false,
    data: {},
  })
  const getStory = async (story_id: number) => {
    console.log(story_id)
    // storyGroup.value.data[story_id] = ''
    try {
      const res = (await story(story_id)).data
      storyGroup.value.data[story_id] = res
      return res
    } catch (e) {
      throw e
    }
  }

  watch(storyIndex, (val) => {
    if (val || val === 0) {
      console.log(isStoriesActive.value)

      console.log('ss')
      if (storyList.value.data && storyList.value.data.length > 0)
        getStory(storyList.value.data[val]?.id)
      isStoriesActive.value = true
      if (!isStoriesActive.value) {
      } else {
        // storyItem.value.loading=true;
      }
    }
  })

  // end сторисы
  // start сторисы
  const storyOtherIndex = ref<number | null>(null)
  const isStoriesOtherActive = ref(false)

  const storyOtherList = ref<DataVal<StoriesT[]>>({ loading: false, data: [] })

  const storyOtherGroup = ref<DataVal<StoryGroupT>>({
    loading: false,
    data: {},
  })
  const getStoryOther = async (story_id: number) => {
    console.log(story_id)
    // storyGroup.value.data[story_id] = ''
    try {
      const res = (await story(story_id)).data
      storyOtherGroup.value.data[story_id] = res
      console.log(storyOtherGroup.value)

      return res
    } catch (e) {
      throw e
    }
  }

  watch(storyOtherIndex, (val) => {
    if (val || val === 0) {
      if (storyOtherList.value.data && storyOtherList.value.data.length > 0)
        getStoryOther(storyOtherList.value.data[val]?.id)
      isStoriesOtherActive.value = true
      if (!isStoriesOtherActive.value) {
      } else {
        // storyItem.value.loading=true;
      }
    }
  })

  // end сторисы
  const promotion = ref<PromotionT | null>(null)
  const setPromotion = async () => {
    try {
      promotion.value = (await getPromotion()).data
    } catch (e) {
      throw e
    }
  }

  return {
    bg,

    storyIndex,
    isStoriesActive,
    storyList,
    getStories,
    storyGroup,
    getStory,

    storyOtherIndex,
    isStoriesOtherActive,
    storyOtherList,

    storyOtherGroup,
    getStoryOther,

    noInt,

    promotion,
    setPromotion,
    isOnline,
  }
})
