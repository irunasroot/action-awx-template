import * as core from '@actions/core'
import { ControllerApi } from './api'

const LAUNCH_REQUIREMENTS_MAPPING: any = {
  ask_inventory_on_launch: 'inventory',
  ask_limit_on_launch: 'limit',
  ask_scm_branch_on_launch: 'scm_branch',
  ask_variables_on_launch: 'extra_vars',
  ask_labels_on_launch: 'labels',
  ask_skip_tags_on_launch: 'skip_tags',
  ask_tags_on_launch: 'job_tags'
}

class WorkflowJobTemplate extends ControllerApi {
  template_id: number
  extra_vars: any | null
  inventory: string | null
  scm_branch: string | null
  limit: string | null
  job_tags: string | null
  skip_tags: string | null

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
    skip_tags: string | null
  ) {
    core.startGroup(`Launching AWX/AAP template: ${template_id}`)

    if (!template_id) {
      throw new Error('Variable workflow_job_template_id was not provided')
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

    core.info(
      `Template: ${this.controller_url}/#/templates/workflow_job_template/${this.template_id}/details`
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
        this[LAUNCH_REQUIREMENTS_MAPPING[key] as keyof WorkflowJobTemplate] ===
          null
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
  }

  async run(): Promise<void> {
    this.validateLaunchRequirements(
      await this.getWorkflowJobTemplateLaunchRequirements(this.template_id)
    )

    const response = await this.launchJobTemplate(this.template_id, {
      extra_vars: this.extra_vars,
      inventory: this.inventory,
      scm_branch: this.scm_branch,
      limit: this.limit,
      job_tags: this.job_tags,
      skip_tags: this.skip_tags
    })

    const jobId: number = response
    let wfJobStatus: any = await this.getWorkflowJobStatus(jobId)
    core.info(`Workflow Job started on: ${wfJobStatus.started}`)

    core.info(`Waiting on job ${jobId} to complete`)
    while (!wfJobStatus.finished) {
      await this.sleep(5000)
      core.debug(`Still waiting on job ${jobId} to complete...`)
      wfJobStatus = await this.getWorkflowJobStatus(jobId)
    }

    core.info(`Workflow job has finished at ${wfJobStatus.finished}`)

    const msg = `Workflow Job completed with status: ${wfJobStatus.status}. See Output from AWX/AAP for more info.`
    if (wfJobStatus.failed) {
      core.setFailed(msg)
    } else {
      core.info(msg)
    }

    core.info(
      `Workflow Job output URL: ${this.controller_url}/#/jobs/workflow/${jobId}/output`
    )
    core.endGroup()

    const workflowNodes = await this.getWorkflowNodes(jobId)

    workflowNodes.forEach(async (node: any) => {
      const jobStatus: any = await this.getJobStatus(node.job)
      core.startGroup(`AWX/AAP Job ${node.job} Output - ${jobStatus.status}`)
      core.info(
        `Job output URL: ${this.controller_url}/#/jobs/playbook/${node.job}/output`
      )
      core.info(`Job started on: ${jobStatus.started}`)
      core.info(`Job finished at ${jobStatus.finished}`)

      const jobOutput = await this.getJobOutput(node.job)
      core.info(jobOutput)
      core.endGroup()
    })
  }
}

export { WorkflowJobTemplate }
