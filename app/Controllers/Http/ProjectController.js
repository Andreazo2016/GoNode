'use strict'

const Project = use('App/Models/Project')


class ProjectController {

  async index({ request }) {

    const { page } = request.get()


    /**Tras os projetos com os seus usuários */
    const projects = await Project.query()
      .with('user')
      .paginate(page)

    return projects

  }


  async store({ request, response, auth }) {


    const data = request.only(['title', 'description'])

    const project = await Project.create({
      ...data,
      user_id: auth.user.id
    })

    return project
  }


  async show({ params, request, response, view }) {

    const { id } = params

    const project = await Project.findOrFail(id)

    /**Carrega os relacionamentos com user e tasks */
    await project.load('user')
    await project.load('tasks')

    return project


  }

  async update({ params, request, response }) {
    const project = await Project.findOrFail(id)
    const data = request.only(['title', 'description'])

    project.merge(data)

    await project.save()

    return project

  }

  async destroy({ params, request, response }) {

    const project = await Project.findOrFail(id)

    await project.delete()
  }
}

module.exports = ProjectController
