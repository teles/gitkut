import type { Meta, StoryObj } from "@storybook/vue3";
import RepoCard from "../components/gitkut/RepoCard.vue";
import { gitkutReposFixture } from "../mocks/fixtures/repos";

const meta: Meta<typeof RepoCard> = {
  title: "Gitkut/RepoCard",
  component: RepoCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof RepoCard>;

export const Default: Story = {
  args: {
    repo: gitkutReposFixture[1],
  },
  render: (args) => ({
    components: { RepoCard },
    setup() {
      return { args };
    },
    template: '<div class="w-[360px]"><RepoCard v-bind="args" /></div>',
  }),
};

export const EmptyDescription: Story = {
  args: {
    repo: gitkutReposFixture[0],
  },
  render: (args) => ({
    components: { RepoCard },
    setup() {
      return { args };
    },
    template: '<div class="w-[360px]"><RepoCard v-bind="args" /></div>',
  }),
};
