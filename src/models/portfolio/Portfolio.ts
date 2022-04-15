export class Portfolio {
  slug: string;
  name: string;
  coverImage: string;
  url: string | null;

  shortDescription: string;
  longDescription: string;

  workplace: string;
  projectRole: string;
  roleDescription: string[];

  members: string[];
  screenshots: string[];

  constructor(slug: string, props: PortfolioProps) {
    this.slug = slug;
    this.name = props.name ?? "";
    this.coverImage = props.coverImage ?? "";
    this.url = props.url ?? null;

    this.shortDescription = props.shortDescription ?? "";
    this.longDescription = props.longDescription ?? "";

    this.workplace = props.workplace ?? "";
    this.projectRole = props.projectRole ?? "";
    this.roleDescription = props.roleDescription ?? [];

    this.members = props.members ?? [];
    this.screenshots = props.screenshots ?? [];
  }

  get hasScreenshots(): boolean {
    return this.screenshots.length > 0;
  }
}

export type PortfolioProps = {
  name: string | null;
  coverImage: string | null;
  url: string | null;

  shortDescription: string | null;
  longDescription: string | null;

  workplace: string | null;
  projectRole: string | null;
  roleDescription: string[] | null;

  members: string[] | null;
  screenshots: string[] | null;
};
