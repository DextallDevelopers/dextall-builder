import { Ref } from 'nuxt/dist/app/compat/capi'
import { iStory } from '~/types/story'

type tTeamStories = () => Promise<{
  stories: Ref<iStory[]>
}>

export const useTeamStories: tTeamStories = async () => {
  const stories = useState<iStory[]>('teamStories', () => null)

  const storyapi = useStoryblokApi()

  try {
    const { data } = await storyapi.get(`cdn/stories`, {
      version: 'draft',
      by_slugs: 'global/team/*',
    })
    stories.value = data.stories
  } catch (e) {
    console.log(e.message)
  }

  return { stories }
}
