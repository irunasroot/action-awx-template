import * as core from '@actions/core'
import { ControllerApi } from './api'

const LAUNCH_REQUIREMENTS_MAPPING: any[string] = {
  ask_scm_branch_on_launch: 'scm_branch',
  ask_variables_on_launch: 'extra_vars',
  ask_tags_on_launch: 'job_tags',
  ask_diff_mode_on_launch: 'diff_mode',
  ask_skip_tags_on_launch: 'skip_tags',
  ask_job_type_on_launch: 'job_type',
  ask_limit_on_launch: 'limit',
  ask_verbosity_on_launch: 'verbosity',
  ask_inventory_on_launch: 'inventory',
  ask_credential_on_launch: 'credentials',
  ask_execution_environment_on_launch: 'execution_environment',
  ask_labels_on_launch: 'labels',
  ask_forks_on_launch: 'forks',
  ask_job_slice_count_on_launch: 'job_slice_count',
  ask_timeout_on_launch: 'timeout',
  ask_instance_groups_on_launch: 'instance_groups'
}

class JobTemplate extends ControllerApi {
  template_id: number
  extra_vars: any | null
  inventory: string | null
  scm_branch: string | null
  limit: string | null
  job_tags: string | null
  skip_tags: string | null
  job_type: string | null
  verbosity: number | null
  diff_mode: boolean | null
  credentials: number[] | null
  credential_passwords: any | null
  execution_environment: number | null
  labels: number[] | null
  forks: number | null
  job_slice_count: number | null
  timeout: number | null
  instance_groups: number[] | null

  constructor(
    controller_url: string,
    controller_username: string,
    controller_password: string,
    controller_token: string,
    controller_timeout: number,
    controller_verify_certificate: boolean,
    template_id: number | null,
    extra_vars: any | null,
    inventory: string | null,
    scm_branch: string | null,
    limit: string | null,
    job_tags: string | null,
    skip_tags: string | null,
    job_type: string | null,
    verbosity: number | null,
    diff_mode: boolean | null,
    credentials: number[] | null,
    credential_passwords: any | null,
    execution_environment: number | null,
    labels: number[] | null,
    forks: number | null,
    job_slice_count: number | null,
    timeout: number | null,
    instance_groups: number[] | null
  ) {
    core.startGroup(`Launching AWX/AAP template: ${template_id}`)

    if (!template_id) {
      throw new Error('Variable job_template_id was not provided')
    }

    super(
      controller_url,
      controller_username,
      controller_password,
      controller_token,
      controller_timeout,
      controller_verify_certificate
    )

    this.template_id = template_id
    this.extra_vars = extra_vars
    this.inventory = inventory
    this.scm_branch = scm_branch
    this.limit = limit
    this.job_tags = job_tags
    this.skip_tags = skip_tags
    this.job_type = job_type
    this.verbosity = verbosity
    this.diff_mode = diff_mode
    this.credentials = credentials
    this.credential_passwords = credential_passwords
    this.execution_environment = execution_environment
    this.labels = labels
    this.forks = forks
    this.job_slice_count = job_slice_count
    this.timeout = timeout
    this.instance_groups = instance_groups

    core.info(
      `Template: ${this.controller_url}/#/templates/job_template/${this.template_id}/details`
    )
  }

  validateLaunchRequirements(launchRequirements: any): void {
    if (launchRequirements.can_start_without_user_input) {
      core.debug('No user input is required. Skipping validation.')
      return
    }

    core.debug('Validating launch requirements')
    const missing: string[] = []
    for (const key in LAUNCH_REQUIREMENTS_MAPPING) {
      core.debug(`Checking ${key}`)

      if (
        launchRequirements[key] &&
        this[LAUNCH_REQUIREMENTS_MAPPING[key] as keyof JobTemplate] === null
      ) {
        core.debug(
          `The variable '${LAUNCH_REQUIREMENTS_MAPPING[key]}' is missing but is required`
        )
        missing.push(LAUNCH_REQUIREMENTS_MAPPING[key])
      }
    }

    if (missing.length > 0) {
      throw new Error(
        `The following required paramaters are missing: ${missing.join(', ')}.`
      )
    }

    if (
      launchRequirements.survey_enabled &&
      launchRequirements.variables_needed_to_start.length > 0
    ) {
      core.debug('Survey is enabled and variables are required. Validating.')
      const missing: string[] = []

      if (
        this.extra_vars === null ||
        (this.extra_vars && Object.keys(this.extra_vars).length === 0)
      ) {
        throw new Error(
          'Survey is enabled and variables are required, but none were provided'
        )
      }

      launchRequirements.variables_needed_to_start.forEach(
        (element: string) => {
          core.debug(`Checking ${element}`)
          if (!(element in this.extra_vars)) {
            core.debug(
              `The variable '${element}' is missing from extra_vars but is required`
            )
            missing.push(element)
          }
        }
      )

      if (missing.length > 0) {
        throw new Error(
          `The following required survey variables are missing: ${missing.join(', ')}.`
        )
      }
    }

    if (
      launchRequirements.passwords_needed_to_start &&
      launchRequirements.passwords_needed_to_start.length > 0
    ) {
      core.debug('Passwords are required. Validating.')
      const missing: string[] = []

      launchRequirements.passwords_needed_to_start.forEach(
        (element: string) => {
          core.debug(`Checking ${element}`)

          if (!(element in this.credential_passwords)) {
            core.debug(
              `The password '${element}' is missing from credential_passwords but is required`
            )
            missing.push(element)
          }
        }
      )

      if (missing.length > 0) {
        throw new Error(
          `The following required passwords are missing: ${missing.join(', ')}.`
        )
      }
    }
  }

  async run(): Promise<void> {
    this.validateLaunchRequirements(
      await this.getJobTemplateLaunchRequirements(this.template_id)
    )

    const payload: any = {
      extra_vars: this.extra_vars,
      inventory: this.inventory,
      scm_branch: this.scm_branch,
      limit: this.limit,
      job_tags: this.job_tags,
      skip_tags: this.skip_tags,
      job_type: this.job_type,
      verbosity: this.verbosity,
      diff_mode: this.diff_mode,
      credentials: this.credentials,
      credential_passwords: this.credential_passwords,
      execution_environment: this.execution_environment,
      labels: this.labels,
      forks: this.forks,
      job_slice_count: this.job_slice_count,
      timeout: this.timeout,
      instance_groups: this.instance_groups
    }

    Object.keys(payload).forEach(k => payload[k] == null && delete payload[k])

    const response = await this.launchJobTemplate(this.template_id, payload)

    const jobId: number = response
    let jobStatus: any = await this.getJobStatus(jobId)
    core.info(`Job started on: ${jobStatus.started}`)

    core.info(`Waiting on job ${jobId} to complete`)
    while (!jobStatus.finished) {
      await this.sleep(5000)
      jobStatus = await this.getJobStatus(jobId)
      core.debug(`Still waiting on job ${jobId} to complete...`)
    }

    core.info(`Job finished at ${jobStatus.finished}`)

    const msg = `Job completed with status: ${jobStatus.status}. See Output from AWX/AAP for more info`
    if (jobStatus.failed) {
      core.setFailed(msg)
    } else {
      core.info(msg)
    }

    core.endGroup()
    core.startGroup(`AWX/AAP Job ${jobId} Output - ${jobStatus.status}`)
    core.info(
      `Job output URL: ${this.controller_url}/#/jobs/playbook/${jobId}/output`
    )

    const jobOutput = await this.getJobOutput(jobId)
    core.info(jobOutput)

    core.endGroup()
  }
}

export { JobTemplate }
