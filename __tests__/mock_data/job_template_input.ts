import { CONTROLLER_INSTANCE } from './controller'
import { JOB_TEMPLATE_DATA, WORKFLOW_JOB_TEMPLATE_DATA } from './job_template'

const JOB_TEMPLATE_INPUT_DATA = {
  controller_url: CONTROLLER_INSTANCE.controller_url,
  controller_username: CONTROLLER_INSTANCE.controller_username,
  controller_password: CONTROLLER_INSTANCE.controller_password,
  controller_token: CONTROLLER_INSTANCE.controller_token,
  controller_timeout: CONTROLLER_INSTANCE.controller_timeout,
  controller_verify_certificate:
    CONTROLLER_INSTANCE.controller_verify_certificate,
  template_id: JOB_TEMPLATE_DATA.id,
  extra_vars: null,
  inventory: null,
  scm_branch: null,
  limit: null,
  job_tags: null,
  skip_tags: null,
  job_type: null,
  verbosity: null,
  diff_mode: null,
  credentials: null,
  credential_passwords: null,
  execution_environment: null,
  labels: null,
  forks: null,
  job_slice_count: null,
  timeout: null,
  instance_groups: null
}

const JOB_TEMPLATE_INPUT_DATA_ARRAY: [
  string,
  string,
  string,
  string,
  number,
  boolean,
  number | null,
  any | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null,
  number | null,
  boolean | null,
  number[] | null,
  any | null,
  number | null,
  number[] | null,
  number | null,
  number | null,
  number | null,
  number[] | null
] = [
  JOB_TEMPLATE_INPUT_DATA.controller_url,
  JOB_TEMPLATE_INPUT_DATA.controller_username,
  JOB_TEMPLATE_INPUT_DATA.controller_password,
  JOB_TEMPLATE_INPUT_DATA.controller_token,
  JOB_TEMPLATE_INPUT_DATA.controller_timeout,
  JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
  JOB_TEMPLATE_INPUT_DATA.template_id,
  JOB_TEMPLATE_INPUT_DATA.extra_vars,
  JOB_TEMPLATE_INPUT_DATA.inventory,
  JOB_TEMPLATE_INPUT_DATA.scm_branch,
  JOB_TEMPLATE_INPUT_DATA.limit,
  JOB_TEMPLATE_INPUT_DATA.job_tags,
  JOB_TEMPLATE_INPUT_DATA.skip_tags,
  JOB_TEMPLATE_INPUT_DATA.job_type,
  JOB_TEMPLATE_INPUT_DATA.verbosity,
  JOB_TEMPLATE_INPUT_DATA.diff_mode,
  JOB_TEMPLATE_INPUT_DATA.credentials,
  JOB_TEMPLATE_INPUT_DATA.credential_passwords,
  JOB_TEMPLATE_INPUT_DATA.execution_environment,
  JOB_TEMPLATE_INPUT_DATA.labels,
  JOB_TEMPLATE_INPUT_DATA.forks,
  JOB_TEMPLATE_INPUT_DATA.job_slice_count,
  JOB_TEMPLATE_INPUT_DATA.timeout,
  JOB_TEMPLATE_INPUT_DATA.instance_groups
]

const WORKFLOW_JOB_TEMPLATE_INPUT_DATA = {
  controller_url: CONTROLLER_INSTANCE.controller_url,
  controller_username: CONTROLLER_INSTANCE.controller_username,
  controller_password: CONTROLLER_INSTANCE.controller_password,
  controller_token: CONTROLLER_INSTANCE.controller_token,
  controller_timeout: CONTROLLER_INSTANCE.controller_timeout,
  controller_verify_certificate:
    CONTROLLER_INSTANCE.controller_verify_certificate,
  template_id: WORKFLOW_JOB_TEMPLATE_DATA.id,
  extra_vars: null,
  inventory: null,
  scm_branch: null,
  limit: null,
  job_tags: null,
  skip_tags: null
}

const WORKFLOW_JOB_TEMPLATE_INPUT_DATA_ARRAY: [
  string,
  string,
  string,
  string,
  number,
  boolean,
  number | null,
  any | null,
  string | null,
  string | null,
  string | null,
  string | null,
  string | null
] = [
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_url,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_username,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_password,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_token,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_timeout,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.controller_verify_certificate,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.template_id,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.extra_vars,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.inventory,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.scm_branch,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.limit,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.job_tags,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA.skip_tags
]

export {
  JOB_TEMPLATE_INPUT_DATA,
  JOB_TEMPLATE_INPUT_DATA_ARRAY,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA,
  WORKFLOW_JOB_TEMPLATE_INPUT_DATA_ARRAY
}
