import type { Meta, StoryObj } from "@storybook/vue3";
import FeaturedReposCard from "../components/gitkut/FeaturedReposCard.vue";
import { gitkutReposFixture } from "../mocks/fixtures/repos";

const meta: Meta<typeof FeaturedReposCard> = {
  title: "Gitkut/FeaturedReposCard",
  component: FeaturedReposCard,
};

export default meta;
type Story = StoryObj<typeof FeaturedReposCard>;

export const Default: Story = {
  args: {
    repos: gitkutReposFixture,
  },
  render: (args) => ({
    components: { FeaturedReposCard },
    setup() {
      return { args };
    },
    template:
      '<div class="max-w-[720px] p-4"><FeaturedReposCard v-bind="args" /></div>',
  }),
};
