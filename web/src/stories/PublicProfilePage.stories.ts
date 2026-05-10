import type { Meta, StoryObj } from "@storybook/vue3";
import { gitkutBadgesFixture } from "../mocks/fixtures/badges";
import { gitkutCommunitiesFixture } from "../mocks/fixtures/communities";
import { gitkutReposFixture } from "../mocks/fixtures/repos";
import { gitkutScrapsFixture } from "../mocks/fixtures/scraps";
import { gitkutUserFixture } from "../mocks/fixtures/user";
import PublicProfilePage from "../pages/PublicProfilePage.vue";

const meta: Meta<typeof PublicProfilePage> = {
  title: "Pages/PublicProfilePage",
  component: PublicProfilePage,
};

export default meta;
type Story = StoryObj<typeof PublicProfilePage>;

export const Default: Story = {
  args: {
    user: gitkutUserFixture,
    repos: gitkutReposFixture,
    scraps: gitkutScrapsFixture,
    communities: gitkutCommunitiesFixture,
    badges: gitkutBadgesFixture,
    loading: false,
  },
};
