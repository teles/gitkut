import type { Meta, StoryObj } from "@storybook/vue3";
import ScrapsCard from "../components/gitkut/ScrapsCard.vue";
import { gitkutScrapsFixture } from "../mocks/fixtures/scraps";

const meta: Meta<typeof ScrapsCard> = {
  title: "Gitkut/ScrapsCard",
  component: ScrapsCard,
};

export default meta;
type Story = StoryObj<typeof ScrapsCard>;

export const Default: Story = {
  args: {
    scraps: gitkutScrapsFixture,
    username: "teles",
  },
  render: (args) => ({
    components: { ScrapsCard },
    setup() {
      return { args };
    },
    template: '<div class="max-w-[720px] p-4"><ScrapsCard v-bind="args" /></div>',
  }),
};
