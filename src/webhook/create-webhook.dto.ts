export class CreateWebHookDto {
  readonly localdir: string;
  readonly githubrepositorie: string;
  readonly bashfile: string;
  readonly log: string;
  readonly status: string;
}
