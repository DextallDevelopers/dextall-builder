import { Ref } from 'nuxt/dist/app/compat/capi'
import { iStory } from '~/types/story'

type tComponentsStories = () => Promise<{
  stories: Ref<iStory[]>
}>

export const useComponentsStories: tComponentsStories = async () => {
  const stories = useState<iStory[]>('componentsStories', () => null)

  const storyapi = useStoryblokApi()

  try {
    const { data } = await storyapi.get(
      `cdn/stories/?by_slugs=components/*`,
      {
        version: 'draft',
      }
    )
    stories.value = data.stories


  } catch (e) {
    console.log(e.message)
  }


  return {stories }
}
