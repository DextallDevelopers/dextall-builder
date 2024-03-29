import { Ref } from 'nuxt/dist/app/compat/capi'
import { iStory } from '~/types/story'
import { useCustomBridge } from '../customBridge'

type tQoutesStories = (
  arg0: string,
  arg1: string
) => Promise<{
  stories: Ref<iStory[]>
  story: Ref<iStory>
  listenStory: (arg0: string | string[]) => void
}>

export const useQoutesStories: tQoutesStories = async (name, version) => {
  const stories = useState<iStory[]>('quotesStories', () => null)
  const story = useState<iStory>('quotesStory', () => null)

  const storyapi = useStoryblokApi()

  try {
    const { data } = await storyapi.get(
      `cdn/stories/?by_slugs=quotes/${name}/*&`,
      {
        version: 'draft',
        resolve_relations: ['About tab (optional).body', 'Optional_tab.body'],
      }
    )
    stories.value = data.stories

    story.value = data.stories.find(s => s.slug === version)
  } catch (e) {
    console.log(e.message)
  }

  const listenStory = (version: string) => {
    useCustomBridge(story.value?.id, evStory => {
      stories.value = stories.value.filter(story => story.slug !== version)
      stories.value = [...stories.value, evStory]
      story.value = evStory
    })
  }

  return { story, stories, listenStory }
}
