import * as core from '@actions/core'
import axios, { AxiosError, AxiosResponse } from 'axios'
import https from 'https'
import http from 'http'

const TEMPLATE_TYPE_JOBS = 'job_templates'
const TEMPLATE_TYPE_WORKFLOW_JOBS = 'workflow_job_templates'

const JOB_TYPE_JOBS = 'jobs'
const JOB_TYPE_WORKFLOW_JOBS = 'workflow_jobs'

class ControllerApi {
  controller_url: string
  client: axios.AxiosInstance

  constructor(
    controller_url: string,
    controller_username: string,
    controller_password: string,
    controller_token: string,
    controller_timeout: number,
    controller_verify_certificate: boolean
  ) {
    core.debug(
      `Defaults for ControllerApi. URL: ${controller_url}; Username: ${controller_username ? '***' : ''}; Password: ${controller_password ? '***' : ''}; Token: ${controller_token ? '***' : ''}; Timeout: ${controller_timeout}; Verify Cert: ${controller_verify_certificate}`
    )

    if (process.env.ACTIONS_STEP_DEBUG === 'true') {
      // Enable some addtional debugging if action debugging is turned on.
      // Should only be used in testing environments

      const onFulfilled = (response: AxiosResponse): AxiosResponse => {
        core.debug(`Response Sucessful: ${response}`)
        return response
      }

      const onRejected = (error: AxiosError): AxiosError => {
        core.debug(`Response Failed: ${error}`)
        return error
      }

      axios.interceptors.response.use(onFulfilled, onRejected)
    }

    if (!controller_url) {
      throw new Error('The controller_url was not provided')
    } else controller_url = new URL(controller_url).origin

    if (
      !(
        controller_url.startsWith('http://') ||
        controller_url.startsWith('https://')
      )
    ) {
      throw new Error(
        'The controller_url does not start with http:// or https://'
      )
    }

    if (!((controller_username && controller_password) || controller_token)) {
      throw new Error(
        'No authenication method was provided. Please provide controller_username/controller_password or a controller_token'
      )
    }

    this.controller_url = controller_url

    const axiosOptions: any = {
      baseURL: controller_url,
      timeout: controller_timeout,
      headers: {
        'Content-Type': 'application/json',
        Authorization: controller_token
          ? `Bearer ${controller_token}`
          : 'Basic ' + btoa(`${controller_username}:${controller_password}`)
      }
    }

    if (this.controller_url.startsWith('https')) {
      axiosOptions['httpsAgent'] = new https.Agent({
        rejectUnauthorized: controller_verify_certificate
      })
    } else {
      axiosOptions['httpAgent'] = new http.Agent({})
    }

    this.client = axios.create(axiosOptions)
  }

  async _getLaunchRequirements(
    template_id: number,
    template_type: string
  ): Promise<any> {
    // endpoint: `/api/v2/${template_type}/${template_id}/launch`
    core.debug(`API endpoint: /api/v2/${template_type}/${template_id}/launch`)

    return this.client
      .get(`/api/v2/${template_type}/${template_id}/launch`)
      .then(response => {
        return response.data
      })
      .catch((error: any) => {
        throw new Error(
          `Error trying to get job launch requirements: ${error.message}.`
        )
      })
  }

  async getJobTemplateLaunchRequirements(template_id: number): Promise<any> {
    core.debug('Getting Job Template launch requirements')
    return this._getLaunchRequirements(template_id, TEMPLATE_TYPE_JOBS)
  }

  async getWorkflowJobTemplateLaunchRequirements(
    template_id: number
  ): Promise<any> {
    core.debug('Getting Workflow Job Template launch requirements')
    return this._getLaunchRequirements(template_id, TEMPLATE_TYPE_WORKFLOW_JOBS)
  }

  async _getRunningJobStatus(job_id: number, job_type: string): Promise<any> {
    // endpoint: `/api/v2/${job_type}/${job_id}/`
    core.debug(`Getting ${job_type} status`)
    core.debug(`API Endpoint: /api/v2/${job_type}/${job_id}/`)
    return this.client
      .get(`/api/v2/${job_type}/${job_id}/`)
      .then(response => {
        // Status values: running, successful, failed
        return {
          started: response.data.started,
          finished: response.data.finished,
          status: response.data.status,
          failed: response.data.failed
        }
      })
      .catch((error: any) => {
        throw new Error(`Error trying to get job status: ${error.message}.`)
      })
  }

  async getJobStatus(job_id: number): Promise<any> {
    return this._getRunningJobStatus(job_id, JOB_TYPE_JOBS)
  }

  async getWorkflowJobStatus(job_id: number): Promise<any> {
    return this._getRunningJobStatus(job_id, JOB_TYPE_WORKFLOW_JOBS)
  }

  async getJobOutput(job_id: number, format = 'ansi'): Promise<any> {
    // endpoint: `/api/v2/jobs/${job_id}/stdout/`
    core.debug('Getting Job Template output')
    core.debug(`API Endpoint: /api/v2/jobs/${job_id}/stdout/`)
    return this.client
      .get(`/api/v2/jobs/${job_id}/stdout/`, {
        params: {
          format: format
        }
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        throw new Error(`Error trying to get job output: ${error.message}.`)
      })
  }

  async getWorkflowNodes(job_id: number): Promise<any> {
    // endpoint: `/api/v2/workflow_jobs/${job_id}/workflow_nodes/`
    core.debug('Getting Workflow Job nodes')
    core.debug(`API Endpoint: /api/v2/workflow_jobs/${job_id}/workflow_nodes/`)
    return this.client
      .get(`/api/v2/workflow_jobs/${job_id}/workflow_nodes/`)
      .then(response => {
        return response.data.results
      })
      .catch(error => {
        throw new Error(`Error trying to get job status: ${error.message}.`)
      })
  }

  async _launchJobTemplate(
    template_id: number,
    template_type: string,
    payload: any
  ): Promise<any> {
    // endpoint: `/api/v2/${template_type}/${template_id}/launch`
    core.debug(`Launching ${template_type}`)
    core.debug(`API Endpoint: /api/v2/${template_type}/${template_id}/launch`)
    return this.client
      .post(`/api/v2/${template_type}/${template_id}/launch`, payload)
      .then(response => {
        return response.data.id
      })
      .catch(error => {
        throw new Error(
          `Error trying to launch the job template: ${error.message}.`
        )
      })
  }

  async launchJobTemplate(template_id: number, payload: any): Promise<number> {
    return this._launchJobTemplate(template_id, TEMPLATE_TYPE_JOBS, payload)
  }

  async launchWorkflowJobTemplate(
    template_id: number,
    payload: any
  ): Promise<number> {
    return this._launchJobTemplate(
      template_id,
      TEMPLATE_TYPE_WORKFLOW_JOBS,
      payload
    )
  }

  async sleep(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
}

export { ControllerApi }
