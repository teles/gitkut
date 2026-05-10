import type { Meta, StoryObj } from "@storybook/vue3";
import ProfileCard from "../components/gitkut/ProfileCard.vue";
import { gitkutReposFixture } from "../mocks/fixtures/repos";
import { gitkutUserFixture } from "../mocks/fixtures/user";

const meta: Meta<typeof ProfileCard> = {
  title: "Gitkut/ProfileCard",
  component: ProfileCard,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

export const Default: Story = {
  args: {
    user: gitkutUserFixture,
    mood: "Hacking",
    currentlyHackingOn: gitkutReposFixture[0]?.name,
    profileViews: 1337,
  },
  render: (args) => ({
    components: { ProfileCard },
    setup() {
      return { args };
    },
    template: '<div class="w-[320px]"><ProfileCard v-bind="args" /></div>',
  }),
};
