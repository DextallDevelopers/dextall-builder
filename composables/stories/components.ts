import { Ref } from 'nuxt/dist/app/compat/capi'
import { iStory } from '~/types/story'

type tComponentsStories = (arg0: string) => Promise<{
  stories: Ref<iStory[]>
  story: Ref<iStory>
  listenStory: (arg0: string | string[]) => void
}>

export const useComponentsStories: tComponentsStories = async name => {
  const stories = useState<iStory[]>('componentsStories', () => null)
  const story = useState<iStory>('componentStory', () => null)

  const storyapi = useStoryblokApi()

  try {
    const { data } = await storyapi.get(`cdn/stories/?by_slugs=components/*`, {
      version: 'draft',
    })
    stories.value = data.stories

    story.value = data.stories.find(s => s.slug === name)
  } catch (e) {
    console.log(e.message)
  }

  const listenStory = (name: string) => {
    const currentStory = stories.value.find(story => story.slug === name)

    useCustomBridge(currentStory.id, evStory => {
      stories.value = stories.value.filter(story => story.slug !== name)
      stories.value = [...stories.value, evStory]
      story.value = evStory
    })
  }

  return { stories, story, listenStory }
}
