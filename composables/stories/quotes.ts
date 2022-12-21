import { Ref } from 'nuxt/dist/app/compat/capi'
import { iStory } from '~/types/story'
import { useCustomBridge } from '../customBridge'

type tQoutesStories = (arg0: string) => Promise<{
  stories: Ref<iStory[]>
  listenStory: (arg0: string | string[]) => void
}>

export const useQoutesStories: tQoutesStories = async name => {
  const stories = useState<iStory[]>('quotesStories', () => null)

  const storyapi = useStoryblokApi()

  try {
    const { data } = await storyapi.get(
      `cdn/stories/?by_slugs=quotes/${name}/*`,
      {
        version: 'draft',
      }
    )
    stories.value = data.stories
  } catch (e) {
    console.log(e.message)
  }

  const listenStory = (slug: string) => {
    const currentStory = stories.value.find(story => story.slug === slug)
    useCustomBridge(currentStory.id, evStory => {
      stories.value = stories.value.filter(story => story.slug !== slug)
      stories.value = [...stories.value, evStory]
    })
  }

  return { stories, listenStory }
}
