import { Ref } from 'nuxt/dist/app/compat/capi'
import { iStory } from '~/types/story'

type tReportStory = () => Promise<{
  story: Ref<iStory>
}>

export const useReportStory: tReportStory = async () => {
  const story = useState<iStory>('reportStory', () => null)

  const storyapi = useStoryblokApi()

  try {
    const { data } = await storyapi.get(
      `cdn/stories/global/sustainability-report`,
      {
        version: 'draft',
      }
    )
    story.value = data.story
  } catch (e) {
    console.log(e.message)
  }

  return { story }
}
