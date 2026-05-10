import type { Meta, StoryObj } from "@storybook/vue3";
import CommunitiesCard from "../components/gitkut/CommunitiesCard.vue";
import { gitkutCommunitiesFixture } from "../mocks/fixtures/communities";

const meta: Meta<typeof CommunitiesCard> = {
  title: "Gitkut/CommunitiesCard",
  component: CommunitiesCard,
};

export default meta;
type Story = StoryObj<typeof CommunitiesCard>;

export const Default: Story = {
  args: {
    communities: gitkutCommunitiesFixture,
  },
  render: (args) => ({
    components: { CommunitiesCard },
    setup() {
      return { args };
    },
    template: '<div class="max-w-[420px] p-4"><CommunitiesCard v-bind="args" /></div>',
  }),
};
