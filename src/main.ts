import * as core from '@actions/core'
import { JobTemplate, WorkflowJobTemplate } from './models/index'

function templateConstructor(params: any): JobTemplate | WorkflowJobTemplate {
  if (params.job_template_id && !params.workflow_job_template_id) {
    return new JobTemplate(
      params.controller_url,
      params.controller_username,
      params.controller_password,
      params.controller_token,
      params.controller_timeout,
      params.controller_verify_certificate,
      params.job_template_id,
      params.extra_vars,
      params.inventory,
      params.scm_branch,
      params.limit,
      params.job_tags,
      params.skip_tags,
      params.job_type,
      params.verbosity,
      params.diff_mode,
      params.credentials,
      params.credential_passwords,
      params.execution_environment,
      params.labels,
      params.forks,
      params.job_slice_count,
      params.timeout,
      params.instance_groups
    )
  } else if (params.workflow_job_template_id && !params.job_template_id) {
    return new WorkflowJobTemplate(
      params.controller_url,
      params.controller_username,
      params.controller_password,
      params.controller_token,
      params.controller_timeout,
      params.controller_verify_certificate,
      params.workflow_job_template_id,
      params.extra_vars,
      params.inventory,
      params.scm_branch,
      params.limit,
      params.job_tags,
      params.skip_tags
    )
  }

  throw new Error(
    'Only one of job_template_id and workflow_job_template_id can be specified'
  )
}

async function run(): Promise<void> {
  try {
    const inputValues = {
      job_template_id: core.getInput('job_template_id'),
      workflow_job_template_id: core.getInput('workflow_job_template_id'),
      extra_vars: core.getInput('extra_vars'),
      inventory: core.getInput('inventory'),
      scm_branch: core.getInput('scm_branch'),
      limit: core.getInput('limit'),
      job_tags: core.getInput('job_tags'),
      skip_tags: core.getInput('skip_tags'),
      job_type: core.getInput('job_type'),
      verbosity: core.getInput('verbosity'),
      diff_mode: core.getInput('diff_mode'),
      credentials: core.getInput('credentials'),
      credential_passwords: core.getInput('credential_passwords'),
      execution_environment: core.getInput('execution_environment'),
      labels: core.getInput('labels'),
      forks: core.getInput('forks'),
      job_slice_count: core.getInput('job_slice_count'),
      timeout: core.getInput('timeout'),
      instance_groups: core.getInput('instance_groups')
    }
    const controller_url: string = core.getInput('controller_url', {
      required: true
    })
    const controller_username: string = core.getInput('controller_username')
    const controller_password: string = core.getInput('controller_password')
    const controller_token: string = core.getInput('controller_token')
    const controller_timeout = Number(core.getInput('controller_timeout'))
    const controller_verify_certificate: boolean = core.getBooleanInput(
      'controller_verify_certificate'
    )
    const job_template_id: number | null = inputValues.job_template_id
      ? Number(inputValues.job_template_id)
      : null
    const workflow_job_template_id: number | null =
      inputValues.workflow_job_template_id
        ? Number(inputValues.workflow_job_template_id)
        : null
    const extra_vars: any | null = inputValues.extra_vars
      ? JSON.parse(core.getInput('extra_vars'))
      : null
    const inventory: string | null = inputValues.inventory
      ? inputValues.inventory
      : null
    const scm_branch: string | null = inputValues.scm_branch
      ? inputValues.scm_branch
      : null
    const limit: string | null = inputValues.limit ? inputValues.limit : null
    const job_tags: string | null = inputValues.job_tags
      ? inputValues.job_tags
      : null
    const skip_tags: string | null = inputValues.skip_tags
      ? inputValues.skip_tags
      : null
    const job_type: string | null = inputValues.job_type
      ? inputValues.job_type
      : null
    const verbosity: number | null = inputValues.verbosity
      ? Number(inputValues.verbosity)
      : null
    const diff_mode: boolean | null = inputValues.diff_mode
      ? Boolean(inputValues.diff_mode)
      : null
    const credentials: number[] | null = inputValues.credentials
      ? inputValues.credentials.split(',').map(n => {
          return Number(n)
        })
      : null
    const credential_passwords: any | null = inputValues.credential_passwords
      ? JSON.parse(inputValues.credential_passwords)
      : null
    const execution_environment: number | null =
      inputValues.execution_environment
        ? Number(inputValues.execution_environment)
        : null
    const labels: number[] | null = inputValues.labels
      ? inputValues.labels.split(',').map(n => {
          return Number(n)
        })
      : null
    const forks: number | null = inputValues.forks
      ? Number(inputValues.forks)
      : null
    const job_slice_count: number | null = inputValues.job_slice_count
      ? Number(inputValues.job_slice_count)
      : null
    const timeout: number | null = inputValues.timeout
      ? Number(inputValues.timeout)
      : null
    const instance_groups: number[] | null = inputValues.instance_groups
      ? inputValues.instance_groups.split(',').map(n => {
          return Number(n)
        })
      : null

    core.setSecret('controller_username')
    core.setSecret('controller_password')
    core.setSecret('controller_token')

    if (job_type && !['check', 'run'].includes(job_type)) {
      throw new Error("The job_type input can only be 'check' or 'run'.")
    }

    if (verbosity && !(verbosity >= 0 && verbosity <= 5)) {
      throw new Error('The verbosity input can only be 0, 1, 3, 4, or, 5')
    }

    const template = templateConstructor({
      controller_url,
      controller_username,
      controller_password,
      controller_token,
      controller_timeout,
      controller_verify_certificate,
      job_template_id,
      workflow_job_template_id,
      extra_vars,
      inventory,
      scm_branch,
      limit,
      job_tags,
      skip_tags,
      job_type,
      verbosity,
      diff_mode,
      credentials,
      credential_passwords,
      execution_environment,
      labels,
      forks,
      job_slice_count,
      timeout,
      instance_groups
    })

    await template.run()
  } catch (error: any) {
    core.setFailed(error.message)
  }
}

export { run }
