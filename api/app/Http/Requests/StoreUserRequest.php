<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [            
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:m_users,email',
            'roles' => 'required|array|min:1',
            'roles.*' => 'exists:m_roles,name'
        ];
    }
}
