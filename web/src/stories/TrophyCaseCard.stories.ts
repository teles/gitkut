import type { Meta, StoryObj } from "@storybook/vue3";
import TrophyCaseCard from "../components/gitkut/TrophyCaseCard.vue";
import { gitkutBadgesFixture } from "../mocks/fixtures/badges";

const meta: Meta<typeof TrophyCaseCard> = {
  title: "Gitkut/TrophyCaseCard",
  component: TrophyCaseCard,
};

export default meta;
type Story = StoryObj<typeof TrophyCaseCard>;

export const Default: Story = {
  args: {
    badges: gitkutBadgesFixture,
  },
  render: (args) => ({
    components: { TrophyCaseCard },
    setup() {
      return { args };
    },
    template: '<div class="max-w-[420px] p-4"><TrophyCaseCard v-bind="args" /></div>',
  }),
};
